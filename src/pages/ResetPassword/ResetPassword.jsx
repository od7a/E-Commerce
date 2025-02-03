import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import favicon from "../../assets/imgs/favicon.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState(null);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("* New Password is required.")
      .min(6, "* Password must be at least 6 characters."),
    confirmNewPassword: Yup.string()
      .required("* Confirm New Password is required.")
      .oneOf([Yup.ref("newPassword"), null], "* Passwords must match."),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: async function (values) {
      const loadingClose = toast.loading("Resetting password... Please wait.");
      try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          method: "PUT",
          data: {
            email: localStorage.getItem("resetEmail"),
            newPassword: values.newPassword,
          },
        };
        let { data } = await axios.request(options);
        if (data.statusMsg === "success") {
          toast.success("Password reset successfully! Redirecting to login page...", {
            position: "top-center",
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to reset password. Please try again later.";
        toast.error(errorMessage);
        setErrorResponse("*" + error.response.data.message);
      } finally {
        toast.dismiss(loadingClose);
      }
    },
  });

  return (
    <section className="flex justify-center items-center p-4">
      <div className="min-h-[400px] w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-8 bg-slate-50 rounded-lg md:rounded-tr-[50px] shadow-sm shadow-current">
        <Link
          to="/verifyResetCode"
          className=" size-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 hover:text-primary-300 cursor-pointer mb-4"
        >
          <i
            className="fa-solid fa-chevron-left"
            title="back To Verification Page"
          ></i>
        </Link>
        <header className="text-center">
          <img src={favicon} alt="" className="size-[90px] mx-auto mb-3" />
          <h1 className="font-bold text-3xl mb-1">Reset Password:</h1>
          <p className="font-medium pb-10 text-sm text-slate-400">
            Enter your new password
          </p>
        </header>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-3 py-2 form-control"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="text-red-600 text-sm">{formik.errors.newPassword}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-3 py-2 form-control"
              name="confirmNewPassword"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirmNewPassword && formik.touched.confirmNewPassword && (
              <p className="text-red-600 text-sm">{formik.errors.confirmNewPassword}</p>
            )}
            {errorResponse && (
              <p className="text-red-600 text-sm">{errorResponse}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn min-w-1/2 mx-auto  block px-4 py-2 bg-primary-500 hover:bg-primary-600"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}