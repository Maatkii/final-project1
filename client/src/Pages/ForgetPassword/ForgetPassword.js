import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  change_password,
  send_password_reset,
} from "../../redux/actions/Actions";
import { errorToast } from "../../utils";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [step, setStep] = useState(0);
  const [resetCode, setResetCode] = useState("");
  const [confirmResetCode, setConfirmResetCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();
  const generateResetCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    setResetCode(code.toString());
  };
  const dispatch = useDispatch();
  useEffect(() => {
    generateResetCode();
  }, []);

  const sendPasswordReset = (e) => {
    e.preventDefault();
    setStep(1);
    dispatch(send_password_reset({ resetCode, email }));
  };

  const confirmCodeReset = (e) => {
    e.preventDefault();
    if (resetCode === confirmResetCode) {
      setStep(2);
    } else {
      errorToast("Code Invalid");
    }
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(change_password({ password, email, navigate }));
    } else {
      errorToast("Password and confirm does not match ! ");
    }
  };
  return (
    <div className="container ">
      <div className="row align-items-center" style={{ height: "90vh" }}>
        <div className="col-xl-5 offset-xl-3">
          {step === 0 ? (
            <div className="login-register-page">
              <form id="login-form">
                <div className="input-with-icon-left">
                  <i className="fa-regular fa-envelope" />
                  <input
                    type="text"
                    className="input-text with-border"
                    name="email"
                    id="emailaddress"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    required=""
                  />
                </div>
              </form>
              {/* Button */}
              <button
                className="button full-width button-sliding-icon ripple-effect margin-top-10"
                type="submit"
                form="login-form"
                style={{ width: "504.163px" }}
                onClick={sendPasswordReset}
              >
                Send <i className="fa-regular fa-paper-plane-top" />
              </button>
            </div>
          ) : step === 1 ? (
            <div className="login-register-page">
              <form id="login-form">
                <div className="input-with-icon-left">
                  <i className="fa-regular fa-lock" />
                  <input
                    type="password"
                    className="input-text with-border"
                    placeholder="confirm code"
                    name="resetCode"
                    onChange={(e) => setConfirmResetCode(e.target.value)}
                    required=""
                  />
                </div>
              </form>
              {/* Button */}
              <button
                className="button full-width button-sliding-icon ripple-effect margin-top-10"
                type="submit"
                form="login-form"
                style={{ width: "504.163px" }}
                onClick={confirmCodeReset}
              >
                Confirm <i className="fa-regular fa-paper-plane-top" />
              </button>
            </div>
          ) : (
            <div className="login-register-page">
              <form id="login-form">
                <div className="input-with-icon-left">
                  <input
                    type="password"
                    className="input-text with-border"
                    placeholder="new password "
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required=""
                  />
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="input-text with-border"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required=""
                  />
                </div>
              </form>
              {/* Button */}
              <button
                className="button full-width button-sliding-icon ripple-effect margin-top-10"
                type="submit"
                form="login-form"
                style={{ width: "504.163px" }}
                onClick={changePassword}
              >
                Save <i className="fa-regular fa-paper-plane-top" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
