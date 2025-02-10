import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import Loading from "../../component/Loading/Loading";
import imageloadin from "../../assets/imgs/Animation - 1734929112513.gif";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(UserContext);
  const { id } = jwtDecode(token);

  async function getUserOrders() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>FreshCart - Order History</title>
        <meta
          name="description"
          content="View your order history and track your purchases. Manage your past orders and check delivery status."
        />
      </Helmet>
      <section className="p-2">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-primary-600">
          <i className="fa-solid fa-box text-4xl animate-bounce"></i> &nbsp;
          Order History
        </h1>

        {orders ? (
          orders.length > 0 ? (
            orders.map((order) => (
              <section
                key={order.id}
                className="rounded-lg border-2 border-primary-500 border-opacity-20 p-4 mb-6"
              >
                <header className="flex justify-between items-center flex-wrap gap-4 sm:gap-0 mb-8 bg-slate-50 p-2 shadow-md">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-primary-500">
                      Order ID:
                    </h2>
                    <span className="inline-block font-bold text-black bg-gray-200 px-2 py-1 rounded-md">
                      #{order.id}
                    </span>
                  </div>
                  <div className="font-cairo flex items-center gap-3 text-white">
                    <h4 className="bg-primary-600 flex items-center p-2 rounded-md w-fit">
                      <i className="fa-solid fa-circle-check mr-2"></i>
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </h4>
                    <h4 className="bg-blue-600 p-2 rounded-md w-fit flex items-center">
                      <i className="fa-solid fa-truck mr-2 animate-pulse"></i>
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </h4>
                  </div>
                </header>

                <div className="grid grid-cols-12 mb-5 gap-4">
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="product-item shadow-md rounded-md overflow-hidden col-span-12 md:col-span-6 lg:col-span-2"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-48 lg:h-60 object-contain lg:object-cover mb-3"
                      />
                      <div className="body-card px-3 py-2 space-y-[2px]">
                        <h2 className="font-bold line-clamp-1 cursor-pointer">
                          <Link to={`/productDetails/${item.product.id}`}>
                            {item.product.title}
                          </Link>
                        </h2>
                        <h3 className="price text-lg font-bold text-primary-500">
                          {item.price} L.E
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-lg font-semibold">
                  Total Order Price:
                  <span className="font-bold text-xl text-primary-600 m-1">
                    {order.totalOrderPrice}
                  </span>
                  L.E
                </p>
              </section>
            ))
          ) : (
            <div className="text-center bg-slate-200 p-5">
              <img src={imageloadin} alt="" className="w-16 mx-auto mb-2" />
              <p className="mb-4">
                <b>Oops!</b> You haven't placed any orders yet. Start shopping
                now by clicking the button below and find something you love!
              </p>
              <Link
                to="/"
                className="btn bg-primary-500 hover:bg-primary-600  px-5
                          py-2"
              >
                Back To Home
              </Link>
            </div>
          )
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}
