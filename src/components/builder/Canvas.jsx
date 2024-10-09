import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export const Canvas = () => {
  const [droppedComponents, setDroppedComponents] = useState([]);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.BOX, ItemTypes.CONTAINER, ItemTypes.DUSTBIN],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()
      
      if (didDrop) {
        return
      }

      setDroppedComponents((prevComponents) => [...prevComponents, item.component]);
      return { name: 'Contain' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} className="canvas" style={{ height: '100vh' }}>
      {droppedComponents.map((Component, index) => (
        <div key={index}>
          {Component}
        </div>
      ))}
    </div>
  );
};
