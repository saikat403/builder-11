import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

export const Canvas = ({ styleConfig }) => {
  const [droppedComponents, setDroppedComponents] = useState([]);

  console.log(droppedComponents);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.BOX, ItemTypes.CONTAINER, ItemTypes.DUSTBIN],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      setDroppedComponents((prevComponents) => [
        ...prevComponents,
        { id: item?.containerId, component: item.component, style: styleConfig }
      ]);

      return { name: 'Contain' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} className="canvas" style={{ height: '100vh' }}>
      {droppedComponents.map(({ component: Component, style }, index) => (
        <div key={index} style={style}>
          {Component}
        </div>
      ))}
    </div>
  );
};
