import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';

const style = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  width: '12rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
};

export const Dustbin = ({greedy = true}) => {
  const [droppedComponents, setDroppedComponents] = useState([]);

  const [{ }, drag] = useDrag(() => ({
    type: ItemTypes.DUSTBIN,
    item: { name: 'Dustbin', component: <Dustbin /> },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.BOX],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop && !greedy) {
        return
      }

      setDroppedComponents((prevComponents) => [...prevComponents, item.component]);
      return { name: 'Dustbin' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  function attachRef(el) {
    drag(el)
    drop(el)
  }

  return (
    <div ref={attachRef} style={{ ...style, backgroundColor }}>
      {droppedComponents.map((Component, index) => (
        <div key={index} style={{ marginTop: '10px' }}>
          {Component}
        </div>
      ))}
    </div>
  );
};
