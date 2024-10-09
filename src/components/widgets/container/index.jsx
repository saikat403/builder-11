'use client';
import { ItemTypes } from '@/components/builder/ItemTypes';
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const defaultStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  width: '12rem',
  maxWidth: '100%',
  minHeight: '30px',
  height: 'auto',
  maxHeight: '100%',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
};

export const Container = ({ setStyleConfig, setCurrentRef, greedy = true }) => {
  const [styles, setStyles] = useState(() => ({
    ...defaultStyle,
    dimension: {
      width: defaultStyle.width,
      height: defaultStyle.height,
      maxWidth: defaultStyle.maxWidth,
      maxHeight: defaultStyle.maxHeight,
    }
  }));

  const [droppedComponents, setDroppedComponents] = useState([]);

  const [containerId] = useState(() => '_' + Math.random().toString(36).substr(2, 9));

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.BOX],
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop && !greedy) {
        return;
      }

      setDroppedComponents((prevComponents) => [...prevComponents, item.component]);
      return { name: 'Container' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CONTAINER,
    item: { name: 'Container', component: <Container setCurrentRef={setCurrentRef} setStyleConfig={setStyleConfig} /> },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = '#808080';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  const handleClick = (e) => {
    e.stopPropagation();
    setCurrentRef(e.target);

    console.log('containerId', containerId);

    if (setStyleConfig) {
      setStyleConfig({ containerId, styles });
    }
  };

  return (
    <div
      ref={(el) => {
        drag(el);
        drop(el);
      }}
      onClick={handleClick}
      style={{ ...styles, backgroundColor, opacity: isDragging ? 0.5 : 1 }}
    >
      {droppedComponents.map((Component, index) => (
        <div key={index}>
          {Component}
        </div>
      ))}
    </div>
  );
};
