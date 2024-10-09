'use client';
import { Dimension } from "../config/dimension";
import { useEffect } from "react";

export const RightSidebar = ({
  styleConfig,
  setStyleConfig,
  currentRef
}) => {

  if (!styleConfig) return null;

  const handleDimensionChange = (dimension) => {

  };

  return (
    <div className="w-64 mt-20 bg-gray-800 text-white flex flex-col shadow-lg p-4">
      <Dimension
        setDimension={handleDimensionChange}
        dimension={styleConfig.styles.dimension}
      />
    </div>
  );
};
