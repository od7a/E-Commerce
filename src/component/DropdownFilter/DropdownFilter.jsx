import React, { useState } from "react";

export default function DropdownFilter({ onFilter }) {
  const [showList, setShowList] = useState(false);

  const handleFilter = (sortOption) => {
    onFilter(sortOption);
    setShowList(false);
  };

  return (
    <>
      <div className="relative w-40">
        <button
          className="flex justify-between items-center w-full bg-primary-500 py-2 px-3 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          onClick={() => setShowList((prev) => !prev)}
        >
          <span>Filter</span>
          <i className={`fa-solid fa-chevron-${showList ? "up" : "down"}`}></i>
        </button>
        {showList && (
          <ul className="absolute bg-white w-full py-2 mt-1 rounded-md shadow-lg z-50">
            <li
              className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100"
              onClick={() => handleFilter("price")}
            >
              Sort by Lowest Price
            </li>
            <li
              className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100"
              onClick={() => handleFilter("-price")}
            >
              Sort by Highest Price
            </li>
            <li
              className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100"
              onClick={() => handleFilter("")}
            >
              Show All Products
            </li>
          </ul>
        )}
      </div>
    </>
  );
}