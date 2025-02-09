import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/imgs/freshcart-logo.svg";
import { UserContext } from "../../context/User.context";
import { CheckLogout } from "../CheckLogOut/CheckLogOut";
import { CartContext } from "../../context/Cart.context";
import { WishListContext } from "../../context/WishList.context";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);
  const { wishlistInfo, getWishlistProducts } = useContext(WishListContext);

  useEffect(() => {
    getCartProducts();
    getWishlistProducts();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-100 py-5 px-2 shadow-sm fixed top-0 right-0 left-0 z-30">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img
            src={freshCartLogo}
            alt="Fresh Cart Logo"
            className="h-7 lg:h-10"
          />
        </Link>

        {token && (
          <ul
            className={`${
              isMenuOpen ? "flex flex-col gap-4" : "hidden"
            } lg:flex lg:items-center lg:gap-4 absolute lg:static bg-slate-100 lg:bg-transparent w-full lg:w-auto left-0 top-16 lg:top-0 p-4 lg:p-0 text-center`}
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative before:absolute before:w-0 before:h-[2.5px] before:bg-primary-400 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                    isActive ? "before:!w-full font-semibold" : ""
                  }`
                }
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `relative before:absolute before:w-0 before:h-[2.5px] before:bg-primary-400 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                    isActive ? "before:!w-full font-semibold" : ""
                  }`
                }
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `relative before:absolute before:w-0 before:h-[2.5px] before:bg-primary-400 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                    isActive ? "before:!w-full font-semibold" : ""
                  }`
                }
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  `relative before:absolute before:w-0 before:h-[2.5px] before:bg-primary-400 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                    isActive ? "before:!w-full font-semibold" : ""
                  }`
                }
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allorders"
                className={({ isActive }) =>
                  `relative before:absolute before:w-0 before:h-[2.5px] before:bg-primary-400 before:left-0 before:-bottom-1 hover:before:w-full before:transition-[width] before:duration-300 ${
                    isActive ? "before:!w-full font-semibold" : ""
                  }`
                }
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Orders
              </NavLink>
            </li>
          </ul>
        )}

        {token && (
          <div className="flex items-center gap-3 ml-0 text-lg lg:text-2xl cursor-pointer">
            <Link to="/wishlist" className="icon-heart relative">
              <i
                className={`fa-regular fa-heart hover:text-primary-700 transition-colors duration-300 ${
                  wishlistInfo?.data?.length === 0 ? "" : "text-primary-800 "
                }`}
              ></i>
              <div className="absolute h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-primary-800 text-white top-0 right-0 translate-x-1/2 -translate-y-1/2 text-xs flex items-center justify-center">
                {wishlistInfo === null ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  <span className="text-sm font-semibold">
                    {wishlistInfo.data.length}
                  </span>
                )}
              </div>
            </Link>

            <Link to="/cart" className="icon-cart relative">
              <i
                className={`fa-solid fa-cart-plus hover:text-primary-700 transition-colors duration-300 ${
                  cartInfo?.numOfCartItems === 0 ? "" : "text-primary-800"
                }`}
              ></i>
              <div className="absolute h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-primary-800 text-white top-0 right-0 translate-x-1/2 -translate-y-1/2 text-xs flex items-center justify-center">
                {cartInfo === null ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  <span className="text-sm font-semibold">
                    {cartInfo.numOfCartItems}
                  </span>
                )}
              </div>
            </Link>

            <button
              onClick={toggleMenu}
              className={`lg:hidden text-xl cursor-pointer transition-colors duration-300 ${
                isMenuOpen ? "text-primary-300" : "text-gray-700"
              }`}
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            <CheckLogout />
          </div>
        )}
      </div>
    </nav>
  );
}