'use client';
import { useState } from "react";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Fixed Header</h1>
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-4">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.25h1.5v1.5h-1.5v-1.5zm0 2.25h1.5v1.5h-1.5v-1.5zm0 2.25h1.5v1.5h-1.5v-1.5zm0 2.25h1.5v1.5h-1.5v-1.5zm0 2.25h1.5v1.5h-1.5v-1.5z"/>
        </svg>
        <div className="dropdown relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-white py-2 px-4 rounded inline-flex items-center">
            <span>User</span>
            <svg className="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
              <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a></li>
              <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a></li>
              <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
