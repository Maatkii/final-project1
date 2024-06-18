import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  admin_get_freelancers,
  admin_delete_freelancer,
} from "../../../redux/actions/adminAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const FreelancerList = () => {
  const { freelancerList } = useSelector((state) => state.adminReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(admin_get_freelancers());
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      dispatch(admin_delete_freelancer(id));
    }
  };
  return (
    <div className="">
      <div class="col-xl-12 col-md-12">
        <div class="section-headline margin-bottom-30">
          <h4>Freelancer List</h4>
        </div>
        <table class="basic-table">
          <tbody>
            <tr>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>

            {freelancerList?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={el.avatar} alt="" className="user-avatar" />
                  </td>
                  <td>
                    {el.firstName}
                    {el.lastName}
                  </td>
                  <td>{el.email}</td>
                  <td>{el.phoneNumber}</td>
                  <td>
                    <button onClick={() => handleDelete(el._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
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

export default FreelancerList;
