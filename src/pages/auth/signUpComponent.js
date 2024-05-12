import * as Yup from "yup";
import Button from "~/components/button";
import { useDispatch } from "react-redux";
import { register } from "~/redux/reducers/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import { useFormik } from "formik";
import "./auth.scss";
import { FaAt, FaKey, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignUpForm = (title) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
    onSubmit: (values) => {
      if (values) {
        const user = {
          email: values.email,
          password: values.password,
        };
        dispatch(register(user))
          .then(unwrapResult)
          .then(() => {
            navigate("/profile");
            alert("Oke, tạo thành công!");
            // setUserName("");
            // setPassword("");
          })
          .catch((err) => {
            console.log(err);
            alert("Đéo ổn rồi trong Catch!");
          });
      } else {
        alert("Đéo ổn rồi!");
      }
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("Bắt buộc!")
        .matches(
          /^[a-zA-Z0-9\u00C0-\u1EF9]{3,}$/,
          "Tên người dùng ít nhất 3 ký tự và không có ký tự đặc biệt!"
        ),
      email: Yup.string()
        .required("Bắt buộc!")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Vui lòng nhập đúng định dạng email!"
        ),
      password: Yup.string()
        .required("Bắt buộc!")
        .matches(
          /^(?=.*[A-Z]).{3,}$/,
          "Mật khẩu ít nhất 3 ký tự và một chữ in hoa!"
        ),
      confirmedPassword: Yup.string()
        .required("Bắt buộc!")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp!"),
    }),
  });

  return title.title === "Sign Up" ? (
    <section className="bg-[#fceab8ea] w-5/6 md:w-2/3 lg:w-3/6 mx-auto rounded-lg p-3 flex flex-col justify-center items-center">
      <h3 className="font-semibold text-lg p-3">{title.title}</h3>
      <form className="w-full lg:w-1/2" onSubmit={formik.handleSubmit}>
        <div className="p-2">
          <label>
            <FaUserAlt></FaUserAlt>
          </label>
          <input
            value={formik.values.userName}
            onChange={formik.handleChange}
            name="userName"
            id="userName"
            type="text"
            autoComplete="off"
            className="sm:text-base text-sm px-3 py-2 border-b-2 border-[#695308] w-full bg-[#fdf9e15e]"
            placeholder="Enter user name"
            required
          />
          {formik.errors && (
            <p className="text-red-500 text-sm">{formik.errors.userName}</p>
          )}
        </div>
        <div className="p-2">
          <label>
            <FaAt></FaAt>
          </label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            id="email"
            type="email"
            autoComplete="off"
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
            // onChange={(e) => {
            //   setPassword(e.target.value);
            //   e.target.value === "" && setCheckPassword(true);
            // }}
            name="password"
            id="password"
            type="password"
            autoComplete="off"
            className="sm:text-base text-sm px-3 py-2 border-b-2 border-[#695308] w-full bg-[#fdf9e15e]"
            placeholder="Enter password"
            required
          />
          {formik.errors && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>
        <div className="p-2">
          <input
            value={formik.values.confirmedPassword}
            onChange={formik.handleChange}
            name="confirmedPassword"
            id="confirmedPassword"
            required
            type="password"
            autoComplete="off"
            className={`sm:text-base text-sm px-3 py-2 border-b-2 border-[#695308] w-full bg-[#fdf9e15e]`}
            placeholder="Enter password again"
          />
          {formik.errors && (
            <p className="text-red-500 text-sm">
              {formik.errors.confirmedPassword}
            </p>
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
            Đăng ký
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
      <h2> Ohhh shit....Something error!</h2>
    </>
  );
};

export default SignUpForm;
