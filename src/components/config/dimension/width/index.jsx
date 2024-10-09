import React from 'react';
import { ConfigInput } from '../../shared/input';

export const Width = ({ value, onWidthChange }) => {
  return <ConfigInput label="Width" value={value} onInputChange={onWidthChange} />;
};
