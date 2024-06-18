import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  admin_get_clients,
  admin_delete_client,
} from "../../../redux/actions/adminAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const ClientList = () => {
  const { clientList } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(admin_get_clients());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      dispatch(admin_delete_client(id));
    }
  };

  return (
    <div>
      <div class="col-xl-12 col-md-12">
        <div class="section-headline margin-bottom-30">
          <h4>Client List</h4>
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

            {clientList?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={el.avatar} alt="" className="user-avatar" />
                  </td>
                  <td>
                    {el.firstName} {el.lastName}
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

export default ClientList;
