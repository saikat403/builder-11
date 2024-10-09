'use client'
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Draggable Widget (to drag from the left sidebar)
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
            style={{
                padding: "10px",
                margin: "5px",
                background: "lightgray",
                cursor: "move",
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
            style={{
                ...style,
                opacity: isDragging ? 0.5 : 1,
                cursor: "move",
                margin: "10px",
                padding: "10px",
                backgroundColor: style.backgroundColor || "lightblue", // Ensure background is applied here
            }}
            onClick={() => onClick(id)} // Click to update styles
        >
            {label}
        </div>
    );
}

// Sidebar for updating styles of the selected element
function Sidebar({ elementStyle, onStyleChange }) {
    const handleChange = (e) => {
        onStyleChange(e.target.name, e.target.value);
    };

    return (
        <div style={{ width: "200px", padding: "10px", borderLeft: "1px solid #ccc" }}>
            <h3>Element Styles</h3>
            <label>
                Width:
                <input
                    type="text"
                    name="width"
                    value={elementStyle.width || ""}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Height:
                <input
                    type="text"
                    name="height"
                    value={elementStyle.height || ""}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Background Color:
                <input
                    type="text"
                    name="backgroundColor"
                    value={elementStyle.backgroundColor || ""}
                    onChange={handleChange}
                    placeholder="Enter color (e.g., #ff0000)"
                />
            </label>
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
        console.log(`Updating style: ${property} to ${value}`); // Debugging log

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
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Left Sidebar with widgets */}
            <div style={{ width: "200px", padding: "20px", borderRight: "1px solid #ccc" }}>
                <h3>Widgets</h3>
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
                style={{
                    flex: 1,
                    padding: "20px",
                    background: canDrop ? (isOver ? "lightyellow" : "lightgreen") : "lightgray",
                }}
            >
                <h3>Main View</h3>
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

            {/* Right Sidebar for styling selected element */}
            {selectedElementId && (
                <Sidebar elementStyle={currentStyle} onStyleChange={handleStyleChange} />
            )}
        </div>
    );
}

// Main App Component
export default function TestBuild() {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <TestBuild1 />
            </DndProvider>
        </div>
    );
}
