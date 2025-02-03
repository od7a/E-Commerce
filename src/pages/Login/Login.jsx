import React, {useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import favicon from "../../assets/imgs/favicon.png";
import { UserContext } from "../../component/context/User.context";

export default function Login() {
  const passwordRegx = /^[a-zA-Z0-9!@#$%^&*]{6,20}$/;
  const emailRegx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const navigate = useNavigate();
  const [incorrectData, setIncorrectData] = useState(null);
  const { setToken } = useContext(UserContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("* Email is required.")
      .matches(emailRegx, "* Invalid email address."),
    password: Yup.string()
      .required("* Password is required.")
      .matches(passwordRegx, "* Invalid password format."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async function (values) {
      const loadingClose = toast.loading("Logging in... Please wait.");
      try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
          method: "POST",
          data: values,
        };
        let { data } = await axios.request(options);
        if (data.message === "success") {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          toast.success("Login successful! Redirecting to home page...");
          setIncorrectData(null);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "* Login failed. Please try again later.";
        toast.error(errorMessage, { position: "top-center" });
        setIncorrectData("*" + error.response.data.message);
      } finally {
        toast.dismiss(loadingClose);
      }
    },
  });

  return (
    <section className="flex justify-center items-center p-4">
      <div className="min-h-[400px] w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-slate-50 px-6 py-3 rounded-lg shadow-sm shadow-current">
        <header className="text-center">
          <img src={favicon} alt="" className="size-[90px] mx-auto mb-3" />
          <h1 className="font-bold text-3xl mb-1">
            Welcome Back:
            <span>
              <i className="fa-solid fa-hand-sparkles ml-2 text-primary-800 hover:text-primary-600"></i>
            </span>
          </h1>
          <p className="font-medium pb-10 text-sm text-slate-400">
            Please enter your details
          </p>
        </header>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
            {incorrectData && (
              <p className="text-red-600 text-sm">{incorrectData}</p>
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

          <button
            type="submit"
            className="btn w-1/2 mx-auto block mb-2 px-4 py-2 bg-primary-500 hover:bg-primary-600"
          >
            Login
          </button>
          <Link
            to="/forgetPassword"
            className="ml-auto block w-fit text-sm italic text-red-500 hover:text-red-700 duration-300 transition-colors"
          >
            Forget Password?
          </Link>
          <div className="flex gap-1 items-center justify-center text-nowrap">
            <span className="text-slate-400">Don't have an account?</span>
            <Link
              to="/signup"
              className="text-lg text-primary-300 hover:text-primary-600 duration-300 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
