import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  admin_approval_payment,
  get_admin_deposit_list,
} from "../../../redux/actions/adminAction";

const PaymentApproval = () => {
  const dispatch = useDispatch();
  const { depositList } = useSelector((state) => state.adminReducer);
  useEffect(() => {
    dispatch(get_admin_deposit_list());
  }, []);

  const handleApprovalPayment = (id) => {
    dispatch(admin_approval_payment(id));
  };
  return (
    <div>
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
                  <th>FullName</th>
                  <th>D17 Number</th>
                  <th>Payment Message</th>
                  <th>Payment Price</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>

                {depositList?.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {el.client &&
                          `${el.client.firstName} ${el.client.lastName}`}
                      </td>
                      <td>{el.d17Number}</td>
                      <td>{el.paymentMessage}</td>
                      <td>{el.price}</td>
                      <td>
                        {el.createdAt.slice(0, 10)}-{el.createdAt.slice(11, 16)}
                      </td>
                      <td>
                        {el.paymentProcess === "ongoing" ? (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleApprovalPayment(el._id)}
                          >
                            Approval
                          </button>
                        ) : (
                          el.paymentProcess
                        )}
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

export default PaymentApproval;
