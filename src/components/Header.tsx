import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RiUserLine } from "react-icons/ri";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { TRY_CURRENCY_SYMBOL } from "../constants";
import { Link } from "react-router-dom";
import { setSearchTerm } from "../redux/searchSlice";

const Header: React.FC = () => {
  const [searchTerm, setSearchTermLocal] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTermLocal(term);
    dispatch(setSearchTerm(term)); // Update the search term in Redux store
  };

  return (
    <header className="flex items-center appPadding py-2 bg-primaryColor text-white">
      {/* Heading */}
      <Link to={"/"}>
        <h1 className="text-xl font-bold uppercase">ETERATION</h1>
      </Link>

      {/* Search Bar */}
      <div className="ml-28">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 w-64 text-black rounded-lg"
        />
      </div>

      <div className="flex space-x-4 ml-auto">
        {/* Balance */}
        <div className="flex items-center space-x-2">
          <PiSuitcaseSimpleLight className="text-white" />
          <span>117.00 {TRY_CURRENCY_SYMBOL}</span>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <RiUserLine className="text-white" />
          <span>Kerem</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
