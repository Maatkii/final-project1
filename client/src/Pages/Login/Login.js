import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/Actions";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const { loading } = useSelector((state) => state.LoginReducer);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    dispatch(login({ loginDetails, navigate }));
  };

  return (
    <>
      <div className="form-login">
        <div className="Login">
          {/* <h1>LOGIN</h1> */}
          <div className="form">
            <i className="fa-solid fa-user"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginDetails.email}
              onChange={handleChange}
            />
            <i className="fa-solid fa-lock  "></i>

            <input
              type="password"
              placeholder="******************"
              name="password"
              value={loginDetails.password}
              onChange={handleChange}
            />
            <div className="remember-box">
              <div>
                <input type="checkbox" value={false} />
                <label>Remember me</label>
              </div>
              <Link to="/forget-password">forget Password?</Link>
            </div>
            <button onClick={handleLogin} className="btn btn-info btn-login">
              {loading ? <ClipLoader color="#ffffff" size={20} /> : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
