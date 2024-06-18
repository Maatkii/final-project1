import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_user_reclamations } from "../../redux/actions/Actions";

const UserReclamations = () => {
  const { reclamations } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_user_reclamations());
  }, []);
  return (
    <div>
      <div class="col-xl-12 col-md-12">
        <div class="section-headline margin-bottom-30">
          <h4>Reclamations</h4>
        </div>
        <table class="basic-table">
          <tbody>
            <tr>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>description</th>
            </tr>

            {reclamations?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={el.user.avatar} alt="" className="user-avatar" />
                  </td>
                  <td>
                    {el.user.firstName}
                    {el.user.lastName}
                  </td>
                  <td>{el.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserReclamations;
