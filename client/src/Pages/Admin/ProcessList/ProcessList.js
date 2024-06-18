import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admin_get_process } from "../../../redux/actions/adminAction";

const ProcessList = () => {
  const { processList } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(admin_get_process());
  }, []);
  console.log(processList);
  return (
    <div>
      <div class="col-xl-12 col-md-12">
        <div class="section-headline margin-bottom-30">
          <h4>Process List</h4>
        </div>
        <table class="basic-table">
          <tbody>
            <tr>
              <th>Client FullName</th>
              <th>Freelancer FullName </th>
              <th>Project Description </th>
              <th>Project Price</th>
              <th>Delevery Time</th>
              <th>Process Start</th>
              <th>Status</th>
            </tr>

            {processList?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    {el.client &&
                      `${el.client.firstName} ${el.client.lastName}`}
                  </td>
                  <td>
                    {el.freelancer &&
                      `${el.freelancer.firstName} ${el.freelancer.lastName}`}
                  </td>
                  <td>{el.offre?.description}</td>
                  <td>{el.price}</td>
                  <td>{el.deliveryTime}</td>
                  <td>{el.createdAt.slice(0, 10)}</td>
                  <td>{el.projectProcess}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessList;
