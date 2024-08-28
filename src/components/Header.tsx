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
    dispatch(setSearchTerm(term));
  };

  return (
    <header className="flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-24 py-2 bg-primaryColor text-white">
      {/* Heading */}
      <Link to={"/"} className="text-xl font-bold uppercase mb-2 md:mb-0 mr-20">
        ETERATION
      </Link>

      {/* Search Bar */}
      <div className="w-full md:w-auto flex-1 md:ml-8 mb-2 md:mb-0">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 w-full md:w-64 text-black rounded-lg"
        />
      </div>

      <div className="flex space-x-4 mt-2 md:mt-0">
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
