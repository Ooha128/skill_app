import React, { useState } from "react";
import Logo from "./logo.jpeg"

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-blue-900 px-1 h-13 flex flex-wrap justify-between items-center shadow-md ">
      {/* Logo */}
      <div className="flex items-center bg-white rounded-md shadow-md p-2 relative top-6 left-10 drop-shadow-xl">
        <img src={Logo} alt="Logo" className="h-full w-20 "  />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex md:hidden">
        <button type="button" className="block text-gray-200 hover:text-white focus:text-white focus:outline-none">
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" />
          </svg>
        </button>
      </div>

      {/* Links */}
      <div className="hidden md:flex md:justify-between md:w-auto w-full md:items-center relative right-20 gap-2">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          {/* Courses */}
          <a href="/problems" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Practice
          </a>

          {/* Profile */}
          <a href="/contests" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Compete
          </a>
        </div>

        {/* Dropdown */}
        <div className="relative inline-block text-left gap-10">
          <button type="button" className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 md:w-auto" id="menu-button text-lg" aria-expanded={dropdownOpen} aria-haspopup="true" onClick={toggleDropdown}>
            User Account
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h8a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm3-1a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1H6z" clipRule="evenodd" />
            </svg></button>
             {/* Dropdown menu */}
      {dropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="py-1" role="none">
            <a href="#" className="text-lg block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-0">
              Profile
            </a>
            <a href="#" className="text-lg block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-1">
              Settings
            </a>
            <a href="#" className="text-lg block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-2">
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  </div>
</nav>
);
}

export default NavBar;





