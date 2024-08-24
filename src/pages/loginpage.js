import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { apiURL } from "../env";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData, userToken } from "../store/slice/userSlice";
import { Link } from "react-router-dom";
import image from "../Assets/login.jpg";

const LoginPage = () => {
  // const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let bodyData = {
        email,
        password,
      };

      let { data } = await axios.post(`${apiURL}/api/admin/login`, bodyData);
      

      localStorage.setItem("token", data.data.token);
      dispatch(userToken(data.data.token));
      dispatch(userData(data.data));
    } catch (error) {
      setShowAlert(true);
      setShowAlert(true);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center w-100 p-4"
        style={{ height: "100vh" }}
      >
        <div className="d-flex  justify-content-end  me-2  w-40  h-100 rounded-4">
          <div className=" text-justify w-50 m-5">
            {showAlert ? (
              <div className="alert alert-warning mt-3" role="alert">
                <strong>Something Went Wrong.</strong>Check your Email Id &
                Password, If the problem persist contact System Admin
              </div>
            ) : null}
            <h1 className="mb-3">Welcome Back&#128075;</h1>
            <p className="mb-4">
              Today is a new day. It's your day. You shape it.Sign in to start
              managing your projects.
            </p>
            <div>
              <p>For Demo use the following credentials</p>
              <p><span className=" fw-bold">Email : </span>Demouser@gmail.com</p>
              <p><span className=" fw-bold">Password : </span>demouser</p>
            </div>
            <div className="d-flex text-start">
              <form>
                <label className="mb-2 ">
                  <strong>Email</strong>
                </label>
                <br />
                <input
                  className=" rounded-1 p-2 w-100 border-light  "
                  type="email"
                  placeholder="Example@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label className="mb-2 mt-2 ">
                  <strong>Password</strong>
                </label>
                <br />
                <input
                  className=" rounded-1 p-2 w-100 border-light  "
                  type="password"
                  placeholder="at least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="w-100 mt-4">
                  <Link className="float-end" to="/forgetPassword">
                    Forget Password
                  </Link>
                  <br />
                </div>

                <button
                  className="w-100 my-3 rounded-2 text-light "
                  style={{ backgroundColor: "rgb(47,52,121)" }}
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                >
                  Sign In
                </button>

                <div className="text-center my-3 ">or</div>

                <div>
                  <p>
                    Don't you have an account?<Link to="/register"> Sign up</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className=" w-50  ms-2">
          <h1>
            <img
              className="rounded-4 float-end"
              src={image}
              alt="Login Page Image"
              style={{ width: "85%", height: "93vh" }}
            />
          </h1>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
