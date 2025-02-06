import { useContext, useEffect } from "react";
import imageloadin from "../../assets/imgs/Animation - 1734929112513.gif";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../component/Loading/Loading";
import CartItem from "../../component/CartItem/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getCartProducts, cartInfo, clearAllCart } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      {!cartInfo ? (
        <Loading />
      ) : (
        <section className="px-3">
          <h1 className="text-2xl md:text-4xl font-bold mb-5 text-primary-500  flex items-center gap-4">
            <i className="fa-solid fa-box text-3xl animate-pulse"></i> Shopping
            Cart
          </h1>
          {cartInfo.numOfCartItems === 0 ? (
            <div className="text-center bg-slate-200 p-5">
              <img src={imageloadin} alt="" className="w-16 mx-auto mb-2" />
              <p className="mb-4">
                <b>Oops!</b> Your cart is empty. Start shopping now by clicking
                the button below and find something you love!
              </p>
              <Link
                to="/"
                className="btn bg-primary-500 hover:bg-primary-600  px-5
                py-2"
              >
                Back To Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {cartInfo.data.products.map((product) => (
                  <CartItem productInfo={product} key={product._id} />
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center md:justify-between flex-wrap gap-4">
                <p className="text-lg font-semibold">
                  Your Total Cart Price{" "}
                  <span className="font-bold text-xl text-primary-600 ml-1">
                    ${cartInfo.data.totalCartPrice}
                  </span>
                </p>
                <div className="space-x-4">
                  <button
                    className="btn bg-red-600 py-3 px-4 text-white font-semibold hover:bg-red-700"
                    onClick={clearAllCart}
                  >
                    Clear All
                  </button>
                  <button className="btn bg-primary-600 py-3 px-4 text-white font-semibold hover:bg-primary-700">
                    <i className="fa-solid fa-cart-shopping fa-bounce mr-2"></i>
                    Buy now
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
