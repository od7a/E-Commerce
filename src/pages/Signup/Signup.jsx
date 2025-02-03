import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import favicon from "../../assets/imgs/favicon.png";

export default function Signup() {
  const [checkEmailExist, setCheckEmailExist] = useState(null);
  const passwordRegx = /^[a-zA-Z0-9!@#$%^&*]{6,20}$/;
  const emailRegx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const phoneRegx = /^(02)?01[0125][0-9]{8}/;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("* Name is required.")
      .min(3, "* Minimum 3 characters.")
      .max(20, "* Maximum 20 characters."),
    email: Yup.string()
      .required("* Email is required.")
      .matches(emailRegx, "* Invalid email address."),
    password: Yup.string()
      .required("* Password is required.")
      .matches(passwordRegx, "* Invalid password format."),
    rePassword: Yup.string()
      .required("* Please confirm your password.")
      .oneOf([Yup.ref("password")], "* Passwords must match."),
    phone: Yup.string()
      .required("* Phone number is required.")
      .matches(phoneRegx, "* Invalid phone number."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const loadingClose = toast.loading(
        "Registering your account... Please wait."
      );
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        if (data.message === "success") {
          toast.success(
            "Account registered successfully! Redirecting to login page..."
          );
          setCheckEmailExist(null);
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to register your account. Please try again later.";
        toast.error(errorMessage);
        setCheckEmailExist("*" + error.response.data.message);
      } finally {
        toast.dismiss(loadingClose);
      }
    },
  });

  return (
    <section className="flex justify-center items-center p-4">
      <div className="min-h-[200px] w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-slate-50 px-6 py-3 rounded-lg shadow-sm shadow-current">
        <header className="text-center">
          <img src={favicon} alt="" className="size-[90px] mx-auto mb-3" />
          <h1 className="font-bold text-3xl mb-1">Get Started:</h1>
          <p className="font-medium pb-6 text-sm text-slate-400">
            Welcome to FreshCart - let's create your account
          </p>
        </header>
        <form className=" space-y-5" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 form-control"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-600 text-sm">{formik.errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 form-control"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 text-sm">{formik.errors.email}</p>
            )}
            {checkEmailExist && (
              <p className="text-red-600 text-sm">{checkEmailExist}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 form-control"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="RePassword"
              className="w-full px-3 py-2 form-control"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="text-red-600 text-sm">{formik.errors.rePassword}</p>
            )}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-3 py-2 form-control"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-600 text-sm">{formik.errors.phone}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn w-1/2 mx-auto block px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded"
          >
            Sign Up
          </button>
          <div className="flex gap-1 items-center justify-center text-nowrap">
            <span className="text-slate-400">Already have an account?</span>
            <Link
              to="/login"
              className="text-lg text-primary-300 hover:text-primary-600 duration-300 transition-colors"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
