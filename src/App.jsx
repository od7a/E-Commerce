import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./component/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UserProvider from "./context/User.context";
import ProtectRoute from "./component/ProtectedRoute/ProtectRoute";
import GuestRoute from "./component/GuestRoute/GuestRoute";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import CartProvider from "./context/Cart.context";
import Cart from "./pages/Cart/Cart";
import WishListProvider from "./context/WishList.context";
import Wishlist from "./pages/Wishlist/Wishlist";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CheckOut from "./pages/CheckOut/CheckOut";
import AllOrders from "./pages/AllOrders/AllOrders";
import NotFound from "./pages/NotFound/NotFound";
import Offline from "./component/Offline/Offline";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRoute>
          <Layout />
        </ProtectRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/products", element: <Products /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brands", element: <Brands /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/productDetails/:id", element: <ProductDetails /> },
        { path: "/checkout", element: <CheckOut /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "verifyResetCode", element: <VerifyResetCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <UserProvider>
        <WishListProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartProvider>
        </WishListProvider>
      </UserProvider>

      <Offline>
        <div className="fixed bottom-8 right-8 flex items-center justify-center gap-3 z-50 bg-slate-100 p-3 rounded-md shadow ">
          <i className="fa-solid fa-wifi text-red-600"></i>
          <p>Wifi is not connect</p>
        </div>
      </Offline>
    </>
  );
}
