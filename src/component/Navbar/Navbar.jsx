import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/imgs/freshcart-logo.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-100  py-5 shadow-sm fixed top-0 right-0 left-0 z-30">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src={freshCartLogo}
            alt="Fresh Cart Logo"
            className="h-8 lg:h-10"
          />
        </Link>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? "flex flex-col gap-4" : "hidden"
          } lg:flex lg:items-center lg:gap-4 absolute lg:static bg-slate-100 lg:bg-transparent w-full lg:w-auto left-0 top-16 lg:top-0 p-4 lg:p-0 text-center`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-400 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                  isActive ? "before:!w-full font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-400 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                  isActive ? "before:!w-full font-semibold" : ""
                }`
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-400 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                  isActive ? "before:!w-full font-semibold" : ""
                }`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/brands"
              className={({ isActive }) =>
                `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-400 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                  isActive ? "before:!w-full font-semibold" : ""
                }`
              }
            >
              Brands
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-400 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                  isActive ? "before:!w-full font-semibold" : ""
                }`
              }
            >
              Orders
            </NavLink>
          </li>
        </ul>

        {/* Cart, Menu, and Logout Icons */}
        <div className="flex items-center gap-3 text-lg lg:text-2xl cursor-pointer">
          <div className="icon-heart relative">
            <i className="fa-regular fa-heart hover:text-primary-700 transition-colors duration-300"></i>
            <div className="absolute h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-primary-800 text-white top-0 right-0 translate-x-1/2 -translate-y-1/2 text-xs flex items-center justify-center">
              3
            </div>
          </div>

          <div className="icon-cart relative">
            <i className="fa-solid fa-cart-plus hover:text-primary-700 transition-colors duration-300"></i>
            <div className="absolute h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-primary-800 text-white top-0 right-0 translate-x-1/2 -translate-y-1/2 text-xs flex items-center justify-center">
              5
            </div>
          </div>

          {/* Menu Button for small screens */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden text-xl cursor-pointer transition-colors duration-300 ${
              isMenuOpen ? "text-primary-300" : "text-gray-700"
            }`}
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="icon-logout ml-1 text-red-700 hover:bg-red-700 hover:text-white px-2 py-1 rounded-md">
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>
      </div>
    </nav>
  );
}
