import React, { useState, useEffect } from 'react';

export const ConfigInput = ({ label = null, value, onInputChange }) => {
  const [height, setHeight] = useState(value.replace(/[^\d]/g, ''));
  const [unit, setUnit] = useState(value.replace(/^\d+/, ''));

  useEffect(() => {
    setHeight(value.replace(/[^\d]/g, ''));
    setUnit(value.replace(/^\d+/, ''));
  }, [value]);

  const handleHeightChange = (e) => {
    const newValue = e.target.value;

    onInputChange(newValue + unit);

    if (/^\d*$/.test(newValue)) {
      setHeight(newValue);
    }
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
  };

  return (
    <div className="flex flex-col mb-4">
      {label && <label className="text-gray-300 text-xs mb-1" htmlFor="width-input">{label}</label>}
      <div className="flex items-center bg-gray-900 border border-gray-700 rounded-md shadow-md">
        <input
          type="number"
          value={height}
          onChange={handleHeightChange}
          className="bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-0 rounded-l-md p-1 text-sm w-full"
          placeholder="Height"
        />
        <select
          value={unit}
          onChange={handleUnitChange}
          className="bg-gray-900 text-white border-l border-gray-700 focus:outline-none focus:ring-0 rounded-r-md p-1 text-sm"
        >
          <option value="px">px</option>
          <option value="%">%</option>
          <option value="em">em</option>
          <option value="rem">rem</option>
        </select>
      </div>
    </div>
  );
};
