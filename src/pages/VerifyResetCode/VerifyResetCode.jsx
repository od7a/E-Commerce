import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import favicon from "../../assets/imgs/favicon.png";

export default function VerifyResetCode() {
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState(null);

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("* Reset code is required.")
      .matches(/^[0-9]{5}$/, "* Reset code must be a 5-digit number."),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: async function (values) {
      const loadingClose = toast.loading("Verifying reset code... Please wait.");
      try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          method: "POST",
          data: {
            resetCode: values.resetCode,
          },
        };
        let { data } = await axios.request(options);
        if (data.status === "Success") {
          toast.success("Reset code verified! Redirecting to reset password page...", {
            position: "top-center",
          });
          setTimeout(() => {
            navigate("/resetPassword");
          }, 2000);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to verify reset code. Please try again later.";
        toast.error(errorMessage);
        setErrorResponse("*" + error.response.data.message);
      } finally {
        toast.dismiss(loadingClose);
      }
    },
  });

  return (
    <section className="flex justify-center items-center  p-4">
      <div className="min-h-[400px] w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-8 bg-slate-50 rounded-lg md:rounded-tr-[50px] shadow-sm shadow-current">
      <Link
          to="/forgetPassword"
          className=" size-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 hover:text-primary-300 cursor-pointer mb-4"
        >
          <i
            className="fa-solid fa-chevron-left"
            title="back To Login Page"
          ></i>
        </Link>
        <header className="text-center">
          <img src={favicon} alt="" className="size-[90px] mx-auto mb-3" />
          <h1 className="font-bold text-3xl mb-1">Verify Reset Code:</h1>
          <p className="font-medium pb-10 text-sm text-slate-400">
            Enter the 6-digit code sent to your email
          </p>
        </header>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Reset Code"
              className="w-full px-3 py-2 form-control"
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.resetCode && formik.touched.resetCode && (
              <p className="text-red-600 text-sm">{formik.errors.resetCode}</p>
            )}
            {errorResponse && (
              <p className="text-red-600 text-sm">{errorResponse}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn w-1/2 mx-auto block px-4 py-2 bg-primary-500 hover:bg-primary-600"
          >
            Verify
          </button>
        </form>
      </div>
    </section>
  );
}