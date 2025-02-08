import React, { useContext, useEffect } from "react";
import { WishListContext } from "../../context/WishList.context";
import Loading from "../../component/Loading/Loading";
import { Link } from "react-router-dom";
import imageloadin from "../../assets/imgs/Animation - 1734995792926.gif";
import { CartContext } from "../../context/Cart.context";

export default function Wishlist() {
  const { wishlistInfo, getWishlistProducts, removeProductFromWishlist } = useContext(WishListContext);
  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    getWishlistProducts();
  }, []);

  return (
    <>
      {!wishlistInfo ? (
        <Loading />
      ) : (
        <section className="p-3">
          <h1 className="text-2xl md:text-4xl font-bold mb-5 text-primary-500  flex items-center gap-4">
            <i className="fa-solid fa-heart text-3xl animate-pulse"></i> My
            Wishlist
          </h1>
          {wishlistInfo.data.length === 0 ? (
            <div className="text-center bg-slate-200 p-5">
              <img src={imageloadin} alt="" className="w-16 mx-auto mb-2" />
              <p className="mb-4">
                <b>Oops!</b> Your wishlist is empty. Start adding products you
                love by clicking the button below!
              </p>
              <Link
                to="/"
                className="btn bg-primary-500 hover:bg-primary-600 px-5 py-2"
              >
                Back To Home
              </Link>
            </div>
          ) : (
            wishlistInfo.data.map((product) => {
              return (
                <div className="bg-slate-50 relative py-6 px-4 mb-5 rounded-lg flex items-center" key={product.id}>
                  <div className="shadow-md rounded-lg overflow-hidden">
                    <img
                      src={product.imageCover}
                      className="w-[150px] h-[150px] object-cover"
                      alt=""
                    />
                  </div>
                  <div className="flex w-full flex-wrap justify-between px-5 gap-5 items-center">
                    <div>
                      <h2 className="text-xl text-primary-400 font-semibold text-nowrap">
                        <Link to={`/productDetails/${ product.id}`}>
                        {product.title}
                        </Link>
                      </h2>
                      <span className="text-primary-300 font-semibold text-nowrap">
                        ${product.price}
                      </span>
                    </div>
                    <button onClick={() => { addProductToCart({ productId: product.id }) }} className="btn bg-primary-600 py-3 px-4 text-white font-semibold hover:bg-primary-700">
                      Add To Cart
                    </button>
                  </div>
                  <div
                    className="size-8 rounded-full bg-gray-200 flex items-center justify-center absolute right-2 top-2 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300"
                    onClick={() => { removeProductFromWishlist({ productId: product.id }) }}
                  >
                    <i className="fa-solid fa-xmark text-2xl cursor-pointer"></i>
                  </div>
                </div>
              );
            })
          )}
        </section>
      )}
    </>
  );
}