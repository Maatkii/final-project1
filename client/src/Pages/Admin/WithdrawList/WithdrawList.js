import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approval_withdraw_requests,
  get_withdraw_requests,
} from "../../../redux/actions/adminAction";

const WithdrawList = () => {
  const { withdrawRequest } = useSelector((state) => state.adminReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_withdraw_requests());
  }, []);
  const handleApprovalWithdraw = (id) => {
    dispatch(approval_withdraw_requests(id));
  };
  return (
    <div>
      <div class="col-xl-12 col-md-12">
        <div class="section-headline margin-bottom-30">
          <h4>Withdraw List</h4>
        </div>
        <table class="basic-table">
          <tbody>
            <tr>
              <th>Freelancer</th>
              <th>d17 Number</th>
              <th>Price</th>
              <th>Status</th>
            </tr>

            {withdrawRequest?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    {el.freelancer.firstName} {el.freelancer.lastName}
                  </td>
                  <td>{el.d17Number}</td>
                  <td>{el.price}</td>
                  <td>
                    {el.paymentProcess === "ongoing" ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleApprovalWithdraw(el._id)}
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
  );
};

export default WithdrawList;
