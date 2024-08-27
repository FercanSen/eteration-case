import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setSortBy } from "../../redux/filterSlice";

interface SortByFilterProps {
  items: string[];
}

const SortByFilter: React.FC<SortByFilterProps> = ({ items }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFilter = useSelector((state: RootState) => state.filter.sortBy);

  const handleItemClick = (item: string) => {
    dispatch(setSortBy(item));
  };

  return (
    <>
      <h2 className="text-lg mb-2">Sort By</h2>
      <div className="bg-white border rounded-lg p-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className={`cursor-pointer p-2 rounded-lg transition-colors flex items-center ${
                selectedFilter === item ? "text-blue-500" : "text-gray-800"
              }`}
              onClick={() => handleItemClick(item)}
            >
              <span
                className={`w-3 h-3 mr-2 rounded-full border ${
                  selectedFilter === item
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-400 bg-gray-100"
                }`}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SortByFilter;
