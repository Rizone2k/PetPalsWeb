// import { useFormik } from "formik";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./auth.scss";
import Button from "~/components/button";
import { FaAt, FaKey } from "react-icons/fa";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "~/redux/reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignInForm = (title) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      if (values) {
        dispatch(login(values))
          .then(unwrapResult)
          .then(navigate("/"))
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Có biến cmnr!");
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Bắt buộc!")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Vui lòng nhập đúng định dạng email!"
        ),
      password: Yup.string()
        .required("Bắt buộc!")
        .min(3, "Mật khẩu tối thiểu phải có 3 ký tự!"),
    }),
  });
  // console.log(formik.errors);

  return title.title === "Sign In" ? (
    <section className="bg-[#fceab8ea] w-5/6 md:w-2/3 lg:w-3/6 mx-auto rounded-lg p-3 flex flex-col justify-center items-center">
      <h3 className="font-semibold text-lg p-3">{title.title}</h3>
      <form className="w-full lg:w-1/2" onSubmit={formik.handleSubmit}>
        <div className="p-2">
          <label>
            <FaAt></FaAt>
          </label>
          <input
            onChange={formik.handleChange}
            type="email"
            autoComplete="off"
            value={formik.values.email}
            name="email"
            id="email"
            className="sm:text-base text-sm px-3 py-2 border-b-2 border-[#695308] w-full bg-[#fdf9e15e]"
            placeholder="Enter email"
            required
          />
          {formik.errors && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div className="p-2">
          <label>
            <FaKey></FaKey>
          </label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            autoComplete="off"
            name="password"
            id="password"
            className="sm:text-base text-sm px-3 py-2 border-b-2 border-[#695308] w-full  bg-[#fdf9e15e]"
            placeholder="Enter password"
            required
          />
          {formik.errors && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            &nbsp;
            <label className="custom-control-label" htmlFor="customCheck1">
              <small> Remember me</small>
            </label>
          </div>
        </div>

        <div className="text-center pt-8">
          <Button
            type="submit"
            className="bg-[#11d191] w-50 rounded-xl border-2 border-[#5ff8b8] hover:shadow-md shadow-sm shadow-[#99fad2] px-5 py-2 text-white"
          >
            Đăng nhập
          </Button>
        </div>
        <div className="forgot-password text-center p-5">
          <small>
            Quên <a href="/">mật khẩu?</a>
          </small>
        </div>
      </form>
    </section>
  ) : (
    <>
      <h2>Ohhh....Something error!</h2>
    </>
  );
};

export default SignInForm;
