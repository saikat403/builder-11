
export default function TestSidebar({ elementStyle, onStyleChange }) {
    const handleChange = (e) => {
        onStyleChange(e.target.name, e.target.value);
    };

    return (
        <div className="w-80 h-screen bg-gray-900 text-white p-4 border-l border-gray-800 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6">Element Styles</h3>

            <div className="space-y-6">
                {/* Width Input */}
                <div>
                    <label className="block text-sm font-medium">Width</label>
                    <input
                        type="text"
                        name="width"
                        value={elementStyle.width || ""}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="e.g., 100px"
                    />
                </div>

                {/* Height Input */}
                <div>
                    <label className="block text-sm font-medium">Height</label>
                    <input
                        type="text"
                        name="height"
                        value={elementStyle.height || ""}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="e.g., 100px"
                    />
                </div>

                {/* Background Color Input */}
                <div>
                    <label className="block text-sm font-medium">Background Color</label>
                    <input
                        type="text"
                        name="backgroundColor"
                        value={elementStyle.backgroundColor || ""}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="e.g., #ff0000"
                    />
                </div>

                {/* Padding Input */}
                <div>
                    <label className="block text-sm font-medium">Padding</label>
                    <input
                        type="text"
                        name="padding"
                        value={elementStyle.padding || ""}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="e.g., 10px"
                    />
                </div>

                {/* Margin Input */}
                <div>
                    <label className="block text-sm font-medium">Margin</label>
                    <input
                        type="text"
                        name="margin"
                        value={elementStyle.margin || ""}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="e.g., 10px"
                    />
                </div>

                {/* Border Radius Input */}
                <div>
                    <label className="block text-sm font-medium">Border Radius</label>
                    <input
                        type="text"
                        name="borderRadius"
                        value={elementStyle.borderRadius || ""}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="e.g., 10px"
                    />
                </div>

                {/* Border Width Input */}
                <div>
                    <label className="block text-sm font-medium">Border Width</label>
                    <input
                        type="text"
                        name="borderWidth"
                        value={elementStyle.borderWidth || ""}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="e.g., 2px"
                    />
                </div>

                {/* Display Select */}
                <div>
                    <label className="block text-sm font-medium">Display</label>
                    <select
                        name="display"
                        value={elementStyle.display || "block"}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="block">Block</option>
                        <option value="inline-block">Inline-block</option>
                        <option value="inline">Inline</option>
                        <option value="flex">Flex</option>
                        <option value="none">None</option>
                    </select>
                </div>

                {/* Flex Direction Select */}
                <div>
                    <label className="block text-sm font-medium">Flex Direction</label>
                    <select
                        name="flexDirection"
                        value={elementStyle.flexDirection || "row"}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="row">Row</option>
                        <option value="column">Column</option>
                        <option value="row-reverse">Row Reverse</option>
                        <option value="column-reverse">Column Reverse</option>
                    </select>
                </div>

                {/* Justify Content Select */}
                <div>
                    <label className="block text-sm font-medium">Justify Content</label>
                    <select
                        name="justifyContent"
                        value={elementStyle.justifyContent || "flex-start"}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="flex-start">Flex Start</option>
                        <option value="flex-end">Flex End</option>
                        <option value="center">Center</option>
                        <option value="space-between">Space Between</option>
                        <option value="space-around">Space Around</option>
                    </select>
                </div>

                {/* Align Items Select */}
                <div>
                    <label className="block text-sm font-medium">Align Items</label>
                    <select
                        name="alignItems"
                        value={elementStyle.alignItems || "stretch"}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="stretch">Stretch</option>
                        <option value="flex-start">Flex Start</option>
                        <option value="flex-end">Flex End</option>
                        <option value="center">Center</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
