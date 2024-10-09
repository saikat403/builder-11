import { useState } from 'react';
import { Height } from "./height";
import { MaxHeight } from "./max-height";
import { MaxWidth } from "./max-width";
import { Width } from "./width";
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Transition } from '@headlessui/react';

export const Dimension = ({ dimension, setDimension }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const onWidthChange = (value) => {
    setDimension({ ...dimension, width: value });
  };

  return (
    <div className="py-2 bg-gray-800 rounded-lg shadow-lg">
      <div
        className="flex justify-between items-center mb-2 cursor-pointer bg-gray-700 p-1 px-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
        onClick={toggleCollapse}
      >
        <div className="flex items-center">
          <h2 className="text-sm font-semibold text-gray-300">Dimensions</h2>
        </div>
        {isOpen ? (
          <ChevronDownIcon className="h-4 w-4 text-gray-400 transition-transform duration-300 transform rotate-180" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-gray-400 transition-transform duration-300 transform rotate-0" />
        )}
      </div>

      <Transition
        show={isOpen}
        enter="transition-all ease-in-out duration-300"
        enterFrom="opacity-0 max-h-0"
        enterTo="opacity-100 max-h-screen"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100 max-h-screen"
        leaveTo="opacity-0 max-h-0"
      >
        <div className="space-y-1 overflow-hidden">
          <div className="flex gap-1">
            <Width value={dimension?.width} onWidthChange={onWidthChange} />
            <Height value={dimension?.height} />
          </div>
          <div className="flex gap-1 mt-1">
            <MaxWidth value={dimension?.maxWidth} />
            <MaxHeight value={dimension?.maxHeight} />
          </div>
        </div>
      </Transition>
    </div>
  );
};
