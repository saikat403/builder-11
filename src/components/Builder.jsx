'use client';
import { DndProvider } from "react-dnd";
import { Main } from "./builder/Main";
import { RightSidebar } from "./builder/RightSidebar";
import { Header } from "./shared/Header";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useEffect, useState } from "react";

export const Builder = () => {
  const [styleConfig, setStyleConfig] = useState(null);
  const [currentRef, setCurrentRef] = useState(null);
  const [builderStyles, setBuilderStyles] = useState([]);

  useEffect(() => {
    if (styleConfig) {
      setBuilderStyles((prev) => {
        const existingIndex = prev.findIndex(item => item.id === styleConfig.containerId);
        if (existingIndex !== -1) {
          const updatedStyles = [...prev];
          updatedStyles[existingIndex] = {
            id: styleConfig.containerId,
            styles: styleConfig.styles,
          };
          return updatedStyles;
        } else {
          return [
            ...prev,
            {
              id: styleConfig.containerId,
              styles: styleConfig.styles,
            },
          ];
        }
      });
    }
  }, [styleConfig]);

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <Header />
        <DndProvider backend={HTML5Backend}>
          <Main
            setStyleConfig={setStyleConfig}
            styleConfig={styleConfig}
            setCurrentRef={setCurrentRef}
          />
        </DndProvider>
      </div>
      <RightSidebar
        currentRef={currentRef}
        styleConfig={styleConfig}
        setStyleConfig={setStyleConfig}
      />
    </div>
  );
}