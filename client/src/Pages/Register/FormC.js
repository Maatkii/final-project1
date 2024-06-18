import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import { errorToast } from "../../utils";
import { useSelector } from "react-redux";

const FormC = ({ registredUser, setRegistredUser, handleSubmit }) => {
  const { loading, error } = useSelector((state) => state.LoginReducer);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    errorToast(error);
  }, [error]);

  const handleChange = (e) => {
    setRegistredUser({ ...registredUser, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" }); // Clear the error message for the field being edited
  };

  const validateForm = () => {
    const errors = {};
    if (!registredUser.firstName) {
      errors.firstName = "Please enter your first name.";
    }
    if (!registredUser.lastName) {
      errors.lastName = "Please enter your last name.";
    }
    if (!registredUser.email) {
      errors.email = "Please enter your email.";
    }
    if (!registredUser.phoneNumber) {
      errors.phoneNumber = "Please enter your phone number.";
    }
    if (!registredUser.password) {
      errors.password = "Please enter your password.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  return (
    <div className="register-client">
      <h2>Sign up to find work you love</h2>
      <div className="container d-flex justify-content-center">
        <div className="row form-register">
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
              />
              {formErrors.firstName && (
                <div className="text-danger">{formErrors.firstName}</div>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
              />
              {formErrors.lastName && (
                <div className="text-danger">{formErrors.lastName}</div>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Your Email"
                name="email"
                onChange={handleChange}
              />
              {formErrors.email && (
                <div className="text-danger">{formErrors.email}</div>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Phone
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Your Phone Number"
                name="phoneNumber"
                onChange={handleChange}
              />
              {formErrors.phoneNumber && (
                <div className="text-danger">{formErrors.phoneNumber}</div>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Password (8 or more characters)"
                name="password"
                onChange={handleChange}
              />
              {formErrors.password && (
                <div className="text-danger">{formErrors.password}</div>
              )}
            </div>
          </div>
          <button
            type="button"
            className="air3-btn air3-btn-primary air3-btn-block-sm"
            onClick={handleFormSubmit}
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              "Create my account"
            )}
          </button>
          <p className="text-center text-body mt-4x mb-6x">
            Already have an account ?
            <Link to="/Login" className="up-n-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormC;
