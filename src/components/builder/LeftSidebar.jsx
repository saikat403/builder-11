'use client';

import { Container } from "../widgets/container";
import { Box } from "./Box";

export const LeftSidebar = () => {
  return (
    <div className="w-64 mt-20 bg-gray-300 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold">Left Sidebar</h1>
        <Box name="Glass" />
      </div>
    </div>
  );
};