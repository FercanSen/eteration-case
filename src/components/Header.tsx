import React from "react";
import { RiUserLine } from "react-icons/ri";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { currencySymbolTRY } from "../constants";

const Header: React.FC = () => {
  return (
    <header className="flex items-center appPadding py-2 bg-primaryColor text-white">
      {/* Heading */}
      <h1 className="text-xl font-bold uppercase">ETERATION</h1>

      {/* Search Bar */}
      <div className="ml-28">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-64 text-black rounded-lg"
        />
      </div>

      <div className="flex space-x-4 ml-auto">
        {/* Balance */}
        <div className="flex items-center space-x-2">
          <PiSuitcaseSimpleLight className="text-white" />
          <span>117.00 {currencySymbolTRY}</span>
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
