import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setModel } from "../../redux/filterSlice";

interface ModelsFilterProps {
  items: string[];
}

const ModelsFilter: React.FC<ModelsFilterProps> = ({ items }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedModels = useSelector((state: RootState) => state.filter.model);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemChange = (item: string) => {
    const newSelection = selectedModels?.includes(item)
      ? selectedModels.filter((model: string) => model !== item)
      : [...(selectedModels || []), item];

    dispatch(setModel(newSelection));
  };

  return (
    <>
      <h2 className="text-lg my-2">Models</h2>
      <div className="bg-white border rounded-lg p-4">
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <ul className="space-y-2 max-h-48 overflow-y-auto">
          {filteredItems.map((item) => (
            <li key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={item}
                checked={selectedModels?.includes(item) || false}
                onChange={() => handleItemChange(item)}
                className="form-checkbox text-blue-500"
              />
              <label htmlFor={item} className="ml-2 cursor-pointer">
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ModelsFilter;
