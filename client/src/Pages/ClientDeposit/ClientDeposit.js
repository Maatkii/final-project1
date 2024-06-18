import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deposit_money,
  get_client_deposit_history,
} from "../../redux/actions/clientActions";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ClientDeposit = () => {
  const { depositHistory } = useSelector((state) => state.clientReducer);
  const [depositDetails, setDepositDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_client_deposit_history());
  }, []);

  const handleChange = (e) => {
    setDepositDetails({ ...depositDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(deposit_money({ depositDetails, setLoading }));
  };
  return (
    <div className="row">
      <div className="col-xl-12">
        <div id="test1" className="dashboard-box">
          {/* Headline */}
          <div className="headline">
            <h3>
              <i className="icon-material-outline-lock" /> Deposit Money
            </h3>
          </div>
          <div className="content with-padding">
            <div className="row">
              <div className="col-xl-6">
                <div className="submit-field">
                  <h5>Money To Deposit</h5>
                  <input
                    type="Number"
                    className="with-border"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="submit-field">
                  <h5>D17 Number </h5>
                  <input
                    type="number"
                    className="with-border"
                    name="d17Number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-xl-12">
                <div className="submit-field">
                  <h5>Your Message with Payment</h5>
                  <textarea
                    type="text"
                    className="with-border"
                    name="paymentMessage"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-xl-12" onClick={handleSubmit}>
                <a href="#" className="button ripple-effect big margin-top-30">
                  {loading ? (
                    <ClipLoader color="#fff" size={20} />
                  ) : (
                    "Submit Deposit"
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="content with-padding">
          <div id="test1" className="dashboard-box">
            {/* Headline */}
            <div className="headline">
              <h3>
                <i className="icon-material-outline-lock" /> Deposit History
              </h3>
            </div>
            <table class="basic-table" style={{ padding: "20px 40px" }}>
              <tbody>
                <tr>
                  <th>D17 Number</th>
                  <th>Payment Message</th>
                  <th>Payment Price</th>
                  <th>Time</th>
                  <th>Payment Process</th>
                </tr>

                {depositHistory?.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>{el.d17Number}</td>
                      <td>{el.paymentMessage}</td>
                      <td>{el.price}</td>
                      <td>
                        {el.createdAt.slice(0, 10)}-{el.createdAt.slice(11, 16)}
                      </td>
                      <td
                        style={
                          el.paymentProcess == "ongoing"
                            ? { color: "rgb(233 192 25)" }
                            : { color: "#18c518" }
                        }
                      >
                        {el.paymentProcess}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDeposit;
