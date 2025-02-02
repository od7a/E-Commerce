import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container min-h-[60vh] pt-36 pb-20 sm:pt-28 ">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
