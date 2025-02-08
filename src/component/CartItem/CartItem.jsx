import React, { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  let { removeProductFromCart, updateProductCart } = useContext(CartContext);
  return (
    <>
      <div className="bg-slate-50 relative py-6 px-4 rounded-lg flex items-center">
        <div className="shadow-md rounded-lg overflow-hidden">
          <img
            src={productInfo.product.imageCover}
            className="w-[150px] h-[150px] object-cover"
            alt=""
          />
        </div>
        <div className="flex w-full flex-wrap justify-between px-5 gap-5 items-center">
          <div>
            <h2 className="text-xl text-primary-400 font-semibold text-nowrap">
              <Link to={`/productDetails/${productInfo.product.id}`}>
              {productInfo.product.title}
              </Link>
            </h2>
            <h3 className="text-md font-medium text-nowrap">
              {productInfo.product.category.name}
            </h3>
            <span className="text-primary-300 font-semibold text-nowrap">
              ${productInfo.price}
            </span>
          </div>
          <div className="flex justify-between items-center gap-6 bg-gray-300 p-3 rounded-lg">
            <div
              className="minus"
              onClick={() => {
                updateProductCart({
                  productId: productInfo.product.id,
                  count: productInfo.count - 1,
                });
              }}
            >
              <i className="fa-solid fa-minus text-xl text-primary-300 hover:text-primary-400 transition-colors duration-300 cursor-pointer"></i>
            </div>
            <span className="text-lg font-bold">{productInfo.count}</span>
            <div
              className="plus"
              onClick={() => {
                updateProductCart({
                  productId: productInfo.product.id,
                  count: productInfo.count + 1,
                });
              }}
            >
              <i className="fa-solid fa-plus text-xl text-primary-300 hover:text-primary-400 transition-colors duration-300 cursor-pointer"></i>
            </div>
          </div>
        </div>
        <div
          className="size-8 rounded-full bg-gray-200 flex items-center justify-center absolute right-2 top-2 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300"
          onClick={() => {
            removeProductFromCart({ productId: productInfo.product.id });
          }}
        >
          <i className="fa-solid fa-xmark text-2xl cursor-pointer"></i>
        </div>
      </div>
    </>
  );
}