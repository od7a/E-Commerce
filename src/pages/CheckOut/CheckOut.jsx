import axios from "axios";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const { cartInfo, getCartProducts } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const phoneRegx = /^(02)?01[0125][0-9]{8}/;

  //* Cash Order
  async function createCashOrder(values) {
    const toastId = toast.loading("Waiting....");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: { token },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.status);
        getCartProducts();
        setTimeout(() => navigate("/allorders"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      toast.dismiss(toastId);
    }
  }

  // ^ Online Payment
  async function handleOnlinePayment(values) {
    let toastLoading = toast.loading("Waiting...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${window.location.origin}`,
        method: "POST",
        headers: { token },
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data)

      if (data.status === "success") {
        toast.success("Redirecting to Stripe...");
        getCartProducts();
        setTimeout(() => {
          window.location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      toast.dismiss(toastLoading);
    }
  }

  const validationSchema = Yup.object({
    shippingAddress: Yup.object().shape({
      city: Yup.string()
        .required("* City is required")
        .min(2, "* City must be at least 2 characters long"),
      phone: Yup.string()
        .matches(phoneRegx, "* Phone must be 10 digits")
        .required("* Phone is required"),
      details: Yup.string()
        .required("* Details are required")
        .min(10, "* Details must be at least 10 characters long"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
      paymentWay: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.paymentWay === "cash") createCashOrder(values);
      else handleOnlinePayment(values);
    },
  });

  return (
    <section className="p-3">
      <h1 className="text-xl font-semibold text-gray-600 mb-4">
        Shipping Address
      </h1>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="city">
          <input
            type="text"
            placeholder="City"
            className="border-[2px] bg-slate-50 border-solid focus:ring-0 focus:outline-none border-primary-500 focus:border-primary-700 w-full"
            {...formik.getFieldProps("shippingAddress.city")}
          />
          {formik.touched.shippingAddress?.city &&
            formik.errors.shippingAddress?.city && (
              <div className="text-red-500 text-sm">
                {formik.errors.shippingAddress.city}
              </div>
            )}
        </div>

        <div className="phone">
          <input
            type="tel"
            placeholder="Phone"
            className="border-[2px] bg-slate-50 border-solid focus:ring-0 focus:outline-none border-primary-500 focus:border-primary-700 w-full"
            {...formik.getFieldProps("shippingAddress.phone")}
          />
          {formik.touched.shippingAddress?.phone &&
            formik.errors.shippingAddress?.phone && (
              <div className="text-red-500 text-sm">
                {formik.errors.shippingAddress.phone}
              </div>
            )}
        </div>

        <div className="details">
          <textarea
            placeholder="Details"
            className="border-[2px] bg-slate-50 border-solid focus:ring-0 focus:outline-none border-primary-500 focus:border-primary-700 w-full"
            {...formik.getFieldProps("shippingAddress.details")}
          ></textarea>
          {formik.touched.shippingAddress?.details &&
            formik.errors.shippingAddress?.details && (
              <div className="text-red-500 text-sm">
                {formik.errors.shippingAddress.details}
              </div>
            )}
        </div>

        <div className="btns flex gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => {
              formik.setFieldValue("paymentWay", "cash");
              setTimeout(() => formik.handleSubmit(), 100); 
            }}
            className="btn bg-blue-600 hover:bg-blue-700 duration-300 transition-colors px-3 py-2 text-white"
          >
            Cash Order
          </button>
          <button
            type="button"
            onClick={() => {
              formik.setFieldValue("paymentWay", "online");
              setTimeout(() => formik.handleSubmit(), 100);
            }}
            className="btn bg-primary-600 hover:bg-primary-700 duration-300 transition-colors px-3 py-2 text-white"
          >
            Online Payment
          </button>
        </div>
      </form>
    </section>
  );
}
