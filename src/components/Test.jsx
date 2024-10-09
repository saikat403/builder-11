'use client'
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TestSidebar from "./TestSidebar";

function DraggableWidget({ id, label, style }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "WIDGET",
        item: { id, label, style },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="p-2 m-2 bg-gray-200 cursor-move opacity-100"
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {label}
        </div>
    );
}

// The actual element instance placed in the main view
function DraggableElement({ id, label, style, onClick }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ELEMENT",
        item: { id, label, style },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="m-4 p-4 bg-blue-200 cursor-move"
            style={{
                ...style,
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: style.backgroundColor || "lightblue", // Ensure background is applied here
                borderRadius: style.borderRadius || "0px", // Added border radius
                border: `${style.borderWidth || "1px"} solid ${style.borderColor || "#000"}`, // Added border width and color
            }}
            onClick={() => onClick(id)} // Click to update styles
        >
            {label}
        </div>
    );
}


// Main component where elements are dropped and styled
function TestBuild1() {
    const [widgets] = useState([
        { id: 1, label: "Box 1", style: { width: "100px", height: "100px", backgroundColor: "lightblue" } },
        { id: 2, label: "Box 2", style: { width: "150px", height: "150px", backgroundColor: "lightgreen" } },
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

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "WIDGET",
        drop: (item) => {
            const newElement = { ...item, id: Date.now() };
            setElements((prevElements) => [...prevElements, newElement]);
        },
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
                        style={element.style}
                        onClick={handleElementClick}
                    />
                ))}
            </div>

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
