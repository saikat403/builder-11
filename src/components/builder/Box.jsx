import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';

// Default styles for the Box
const defaultStyle = {
  display: 'inline-block',
  width: '100%',
  maxWidth: '100%',
  height: '2rem',
  maxHeight: '100%',
  color: 'black',
  padding: '0px',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  border: '1px solid black',
};

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const Box = ({ setStyleConfig, name }) => {
  const [id] = useState(generateId());
  const [styles, setStyles] = useState(() => ({
    ...defaultStyle,
    dimension: {
      width: defaultStyle.width,
      height: defaultStyle.height,
      maxWidth: defaultStyle.maxWidth,
      maxHeight: defaultStyle.maxHeight,
    }
  }));

  // Dragging logic
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id, name, component: <Box name={name} setStyleConfig={setStyleConfig} /> },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  const handleClick = (e) => {
    e.stopPropagation();

    if (setStyleConfig) {
      setStyleConfig({ containerId: id, styles });
    }
  };

  return (
    <div ref={drag} style={{ opacity, ...defaultStyle }} onClick={handleClick}>
      {name}
    </div>
  );
};
