'use client';
import { DndContext } from 'react-dnd';
import Frame, { FrameContext } from 'react-frame-component';
import { Box } from './Box';
import { useContext, useEffect } from 'react';
import { Container } from '../widgets/container';
import { Canvas } from './Canvas';

const DndFrame = ({ children }) => {
  const { dragDropManager } = useContext(DndContext);
  const { window } = useContext(FrameContext);

  useEffect(() => {
    dragDropManager.getBackend().addEventListeners(window);
  });

  return children;
};

export const Main = ({ setStyleConfig, setCurrentRef, styleConfig }) => {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-300 mt-20 p-4">
        <Box name="Box" setStyleConfig={setStyleConfig} />
        <Container setStyleConfig={setStyleConfig} setCurrentRef={setCurrentRef} />
      </div>

      <Frame className="w-full h-screen bg-gray-200 mt-[72px]">
        <DndFrame>
          <Canvas styleConfig={styleConfig} />
        </DndFrame>
      </Frame>
    </div>
  );
};
