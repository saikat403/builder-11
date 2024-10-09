'use client'
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TestSidebar from "./TestSidebar";

// Draggable widget component (used for dragging widget)
function DraggableWidget({ id, label, type, style }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "WIDGET",
        item: { id, label, type, style },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="p-2 m-2 bg-gray-200 cursor-move"
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {label}
        </div>
    );
}

// Draggable element (parent or child) placed in the main view (droppable area)
function DraggableElement({ id, label, type, style, onClick, children, onAddChild, allowedTypes }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ELEMENT",
        item: { id, label, style },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: allowedTypes || "WIDGET", // Only accept specific types of widgets
        drop: (item) => {
            if (item.type === "WIDGET") {
                onAddChild(item); // Add widget to this box if it's a parent
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`m-4 p-4 ${children.length > 0 ? 'bg-gray-100' : 'bg-blue-200'} cursor-move`}
            style={{
                ...style,
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: style.backgroundColor || "lightblue",
                borderRadius: style.borderRadius || "0px",
                border: `${style.borderWidth || "1px"} solid ${style.borderColor || "#000"}`,
                display: style.display || 'block', // Support display styles
            }}
            onClick={() => onClick(id)} // Click to update styles
        >
            {label}
            <div ref={drop} className="m-2">{children}</div>
        </div>
    );
}

// Main builder component
function TestBuild1() {
    const [widgets] = useState([
        { id: 1, label: "Box 1", type: "box", style: { width: "200px", height: "200px", backgroundColor: "lightblue", display: "block" } },
        { id: 2, label: "Box 2", type: "box", style: { width: "200px", height: "200px", backgroundColor: "lightgreen", display: "block" } },
        { id: 3, label: "Text Block", type: "text", style: { width: "150px", height: "100px", backgroundColor: "lightyellow", display: "block" } },
        { id: 4, label: "Button", type: "button", style: { width: "100px", height: "40px", backgroundColor: "lightcoral", display: "block" } },
    ]);

    const [elements, setElements] = useState([]);
    const [selectedElementId, setSelectedElementId] = useState(null);
    const [currentStyle, setCurrentStyle] = useState({});

    const handleElementClick = (id) => {
        const selectedElement = elements.find((element) => element.id === id);
        setSelectedElementId(id);
        setCurrentStyle(selectedElement.style);
    };

    const handleStyleChange = (property, value) => {
        setCurrentStyle((prevStyle) => ({
            ...prevStyle,
            [property]: value,
        }));

        setElements((prevElements) =>
            prevElements.map((element) =>
                element.id === selectedElementId
                    ? { ...element, style: { ...element.style, [property]: value } }
                    : element
            )
        );
    };

    const handleAddWidgetToElement = (widget) => {
        const newElement = {
            ...widget,
            id: Date.now(),
            label: widget.label,
            style: { ...widget.style }, // Copy the style to avoid mutation
            children: [], // Initialize as an empty array for nested elements
        };
        setElements((prevElements) => [...prevElements, newElement]);
    };

    const handleAddChildToBox = (boxId, widget) => {
        const newChild = { ...widget, id: Date.now(), label: widget.label, style: { ...widget.style } };
        setElements((prevElements) =>
            prevElements.map((element) =>
                element.id === boxId
                    ? { ...element, children: [...element.children, newChild] }
                    : element
            )
        );
    };

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "WIDGET",
        drop: (item) => handleAddWidgetToElement(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <div className="flex h-screen">
            {/* Left Sidebar with widgets */}
            <div className="w-64 p-6 border-r border-gray-300 bg-gray-50">
                <h3 className="text-xl font-semibold mb-4">Widgets</h3>
                {widgets.map((widget) => (
                    <DraggableWidget
                        key={widget.id}
                        id={widget.id}
                        label={widget.label}
                        type={widget.type}
                        style={widget.style}
                    />
                ))}
            </div>

            {/* Main View with dropped elements */}
            <div
                ref={drop}
                className="flex-1 p-6 bg-gray-100"
                style={{
                    background: canDrop ? (isOver ? "lightyellow" : "lightgreen") : "lightgray",
                }}
            >
                <h3 className="text-2xl font-semibold mb-4">Main View</h3>
                {elements.map((element) => (
                    <DraggableElement
                        key={element.id}
                        id={element.id}
                        label={element.label}
                        type={element.type}
                        style={element.style}
                        allowedTypes={element.type === "box" ? ["text", "button"] : []} // Only allow text and button inside boxes
                        onClick={handleElementClick}
                        onAddChild={(widget) => handleAddChildToBox(element.id, widget)} // Add widget to nested box
                    >
                        {/* Render nested elements */}
                        {element.children?.map((child) => (
                            <DraggableElement
                                key={child.id}
                                id={child.id}
                                label={child.label}
                                style={child.style}
                                onClick={() => handleAddChildToBox(element.id, child)} // Add child to box
                            />
                        ))}
                    </DraggableElement>
                ))}
            </div>

            {/* Sidebar for editing selected element styles */}
            {selectedElementId && (
                <TestSidebar elementStyle={currentStyle} onStyleChange={handleStyleChange} />
            )}
        </div>
    );
}

export default function BuildPage() {
    return (
        <DndProvider backend={HTML5Backend}>
            <TestBuild1 />
        </DndProvider>
    );
}
