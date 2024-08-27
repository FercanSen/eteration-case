import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setBrand } from "../../redux/filterSlice";

interface BrandsFilterProps {
  items: string[];
}

const BrandsFilter: React.FC<BrandsFilterProps> = ({ items }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedBrands = useSelector((state: RootState) => state.filter.brand);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemChange = (item: string) => {
    const newSelection = selectedBrands?.includes(item)
      ? selectedBrands.filter((brand: string) => brand !== item)
      : [...(selectedBrands || []), item];

    dispatch(setBrand(newSelection));
  };

  return (
    <>
      <h2 className="text-lg my-2">Brands</h2>
      <div className="bg-white border rounded-lg p-4">
        <input
          type="text"
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={item}
                checked={selectedBrands?.includes(item) || false}
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

export default BrandsFilter;
