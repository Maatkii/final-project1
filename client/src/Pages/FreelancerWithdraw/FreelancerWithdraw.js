import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorToast } from "../../utils";
import ClipLoader from "react-spinners/ClipLoader";
import {
  add_withdraw_request,
  get_withdraw_request,
} from "../../redux/actions/FreelancerActions";

const FreelancerWithdraw = () => {
  const { user } = useSelector((state) => state.LoginReducer);
  const { withdrawRequest } = useSelector((state) => state.FreelancerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_withdraw_request());
  }, []);

  const [loading, setLoading] = useState(false);
  const [withdrawDetails, setWithdrawDetails] = useState(false);
  const handleChange = (e) => {
    setWithdrawDetails({ ...withdrawDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (user?.balance >= withdrawDetails.price) {
      setLoading(true);
      dispatch(add_withdraw_request({ withdrawDetails, setLoading }));
    } else {
      errorToast("insufficient balance");
    }
  };
  return (
    <div className="dashboard-content-inner" style={{ minHeight: 297 }}>
      {/* Dashboard Headline */}

      {/* Row */}
      <div className="row">
        {/* Dashboard Box */}
        <div className="col-xl-12">
          <div className="dashboard-box margin-top-0">
            {/* Headline */}
            <div className="headline">
              <h3>
                <i className="icon-feather-folder-plus" /> Withdraw Submission
                Form
              </h3>
            </div>
            <div className="content with-padding padding-bottom-10">
              <div className="row">
                <div className="col-xl-12">
                  <div className="submit-field">
                    <h5>d17 Number</h5>
                    <input
                      type="number"
                      name="d17Number"
                      className="with-border"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="submit-field">
                    <h5>Price</h5>
                    <input
                      type="number"
                      name="price"
                      className="with-border"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <a
            href="#"
            className="button ripple-effect big margin-top-30"
            onClick={handleSubmit}
          >
            {loading ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              <>
                <i className="fa-solid fa-plus" /> Send
              </>
            )}
          </a>
        </div>
      </div>
      <div>
        <div class="col-xl-12 col-md-12">
          <div class="section-headline margin-bottom-30">
            <h4>Withdraw Request History</h4>
          </div>
          <table class="basic-table">
            <tbody>
              <tr>
                <th>d17 Number</th>
                <th>Price</th>
                <th>Status</th>
              </tr>

              {withdrawRequest?.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{el.d17Number}</td>
                    <td>{el.price}</td>
                    <td>{el.paymentProcess}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FreelancerWithdraw;
