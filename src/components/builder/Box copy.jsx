import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';

export const Box = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name, component: <Box name={name} /> },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ opacity, border: '1px solid gray', padding: '0.5rem', margin: '0.5rem' }}>
      {name}
    </div>
  );
};
