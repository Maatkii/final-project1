import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import FormC from "./FormC";
import FormF from "./FormF";
import { register } from "../../redux/actions/Actions";
import { useDispatch } from "react-redux";
const Register = () => {
  const [client, setClient] = useState(true);
  const [form, setForm] = useState(1);
  const [registredUser, setRegistredUser] = useState({
    role: "client",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeRoleTrue = () => {
    setClient(true);
    setRegistredUser({ ...registredUser, role: "client" });
  };
  const changeRoleFalse = () => {
    setClient(false);
    setRegistredUser({ ...registredUser, role: "freelancer" });
  };
  const handleSubmit = () => {
    dispatch(register({ registredUser, navigate }));
  };
  return (
    <div className="register">
      <div className="container">
        {form == 1 ? (
          <div className="air3-grid-container">
            <div className="page-containers span-md-8 span-md-10 span-md-12">
              <div className="page-card mt-8x my-md-10x">
                <div className="text-center">
                  <h2 className="display-rebrand mt-6x pb-2x mb-6x mb-md-10x">
                    Join as a client or freelancer
                  </h2>
                  <div className="r-cards">
                    <fieldset>
                      <div className="air3-grid-container">
                        <div
                          className="span-12 span-md-5 first-button"
                          onClick={changeRoleTrue}
                        >
                          <div
                            className={
                              client
                                ? `air3-btn-box h-100 is-active`
                                : `air3-btn-box h-100`
                            }
                          >
                            <div
                              className={
                                client
                                  ? `air3-radio-label air3-btn-box-check-icon  is-active`
                                  : `air3-radio-label air3-btn-box-check-icon `
                              }
                            >
                              <div className="air3-checkbox-fake-input">
                                <span className="air3-radio-icon" />
                              </div>
                            </div>{" "}
                            <input
                              type="radio"
                              name="radio-group-1"
                              className="air3-btn-box-input"
                            />{" "}
                            <div className="air3-icon lg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                data-name="Layer 1"
                                viewBox="0 0 24 24"
                                role="img"
                              >
                                <path
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  stroke="var(--icon-color, #001e00)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M19.28 21h-6.9a1.6 1.6 0 01-1.73-1.5v-4a1.6 1.6 0 011.73-1.5h6.9A1.59 1.59 0 0121 15.5v4a1.66 1.66 0 01-1.72 1.5z"
                                />
                                <path
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  stroke="var(--icon-color, #001e00)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M16.9 12h-2.15a.65.65 0 00-.72.66V14h3.59v-1.34a.65.65 0 00-.72-.66z"
                                />
                                <line
                                  x1="10.65"
                                  x2={21}
                                  y1="17.29"
                                  y2="17.29"
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  stroke="var(--icon-color, #001e00)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                                <circle
                                  cx="10.04"
                                  cy="5.73"
                                  r="2.73"
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  stroke="var(--icon-color, #001e00)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                                <path
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  stroke="var(--icon-color, #001e00)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M3 18.45v-.9a7 7 0 017-7h.09a6.73 6.73 0 011.91.27"
                                />
                              </svg>
                            </div>{" "}
                            <div
                              id="button-box-3"
                              className="air3-btn-box-label"
                            >
                              <h4 className="mt-4">
                                I’m a client, hiring for a project
                              </h4>
                              <div className="air3-btn-box-text" />
                            </div>
                          </div>
                        </div>
                        <div
                          className="span-12 span-md-5"
                          onClick={changeRoleFalse}
                        >
                          <div
                            className={
                              client
                                ? `air3-btn-box h-100`
                                : `air3-btn-box h-100 is-active`
                            }
                          >
                            <div
                              className={
                                client
                                  ? `air3-radio-label air3-btn-box-check-icon`
                                  : `air3-radio-label air3-btn-box-check-icon is-active `
                              }
                            >
                              <div className="air3-checkbox-fake-input">
                                <span className="air3-radio-icon" />
                              </div>
                            </div>{" "}
                            <input
                              type="radio"
                              name="radio-group-2"
                              className="air3-btn-box-input"
                            />{" "}
                            <div className="air3-icon lg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                data-name="Layer 1"
                                viewBox="0 0 24 24"
                                role="img"
                              >
                                <polygon
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  stroke="var(--icon-color, #001e00)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  points="19.38 21 8.38 21 10 14 21 14 19.38 21"
                                />
                                <circle
                                  cx="14.69"
                                  cy="17.5"
                                  r=".5"
                                  fill="var(--icon-color, #001e00)"
                                  vectorEffect="non-scaling-stroke"
                                  stroke="var(--icon-color, #001e00)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <line
                                  x1="9.43"
                                  x2="5.99"
                                  y1={21}
                                  y2={21}
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  stroke="var(--icon-color, #001e00)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                                <circle
                                  cx="10.04"
                                  cy="5.73"
                                  r="2.73"
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  stroke="var(--icon-color, #001e00)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                />
                                <path
                                  fill="none"
                                  vectorEffect="non-scaling-stroke"
                                  stroke="var(--icon-color, #001e00)"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  d="M3 18.45v-.9a7 7 0 017-7h.09a6.94 6.94 0 013.79 1.12"
                                />
                              </svg>
                            </div>
                            <div
                              id="button-box-4"
                              className="air3-btn-box-label"
                            >
                              <h4 className="mt-4">
                                I’m a freelancer, looking for work
                              </h4>{" "}
                              <div className="air3-btn-box-text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>{" "}
                  <div className="mt-6x mt-md-10x">
                    <button
                      type="button"
                      className="air3-btn air3-btn-primary "
                      onClick={() => (client ? setForm(2) : setForm(3))}
                    >
                      {client ? `Join as a Client` : `Join as a Freelancer`}
                    </button>{" "}
                    <p className="text-center text-body mt-4x mb-6x ">
                      Already have an account ?
                      <Link to="/login" className="up-n-link">
                        Log In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : form == 2 ? (
          <FormC
            registredUser={registredUser}
            setRegistredUser={setRegistredUser}
            handleSubmit={handleSubmit}
          />
        ) : (
          <FormF
            registredUser={registredUser}
            setRegistredUser={setRegistredUser}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
