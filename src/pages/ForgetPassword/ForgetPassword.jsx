import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import favicon from "../../assets/imgs/favicon.png";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const emailRegx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("* Email is required.")
      .matches(emailRegx, "* Invalid email address."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async function (values) {
      const loadingClose = toast.loading("Sending reset email... Please wait.");
      try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          method: "POST",
          data: values,
        };
        let { data } = await axios.request(options);
        if (data.statusMsg === "success") {
          toast.success(
            "Reset email sent successfully! Redirecting to verification page...",
            {
              position: "top-center",
            }
          );

          localStorage.setItem("resetEmail", values.email);
          setTimeout(() => {
            navigate("/verifyResetCode");
          }, 2000);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to send reset email. Please try again later.";
        toast.error(errorMessage);
        setErrorResponse("*" + error.response.data.message);
      } finally {
        toast.dismiss(loadingClose);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Forgot Password - Reset Your Account</title>
        <meta
          name="description"
          content="Enter your email to receive a password reset link."
        />
      </Helmet>
      <section className="flex justify-center items-center p-4">
        <div className="min-h-[400px] w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-8  bg-slate-50 rounded-lg md:rounded-tr-[50px] shadow-sm shadow-current">
          <Link
            to="/login"
            className=" size-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 hover:text-primary-300 cursor-pointer mb-4"
          >
            <i
              className="fa-solid fa-chevron-left"
              title="back To Login Page"
            ></i>
          </Link>
          <header className="text-center">
            <img src={favicon} alt="" className="size-[90px] mx-auto mb-3" />
            <h1 className="font-bold text-3xl mb-1">Forget Password?:</h1>
            <p className="font-medium pb-10 text-sm text-slate-400">
              Enter your email address
            </p>
          </header>
          <form className="space-y-5" onSubmit={formik.handleSubmit}>
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
              {errorResponse && (
                <p className="text-red-600 text-sm">{errorResponse}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn w-1/2 mx-auto block px-4 py-2 bg-primary-500 hover:bg-primary-600"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
