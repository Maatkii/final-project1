import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_reclamations } from "../../../redux/actions/adminAction";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, url } from "../../../utils";
import axios from "axios";
import { add_Chat, add_selectedChat } from "../../../redux/actions/chatActions";
import "./popup.css";

const Reclamations = () => {
  const { reclamations } = useSelector((state) => state.adminReducer);
  const { chats } = useSelector((state) => state.ChatReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedReclamation, setSelectedReclamation] = useState(null);

  useEffect(() => {
    dispatch(get_admin_reclamations());
  }, []);

  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const { data } = await axios.post(
        `${url}/api/v1/chat`,
        {
          userId,
        },
        config
      );
      if (!chats.find((c) => c._id === data._id))
        dispatch(add_Chat([data, ...chats]));
      dispatch(add_selectedChat(data));
      navigate("/messages");
    } catch (error) {
      errorToast(error);
    }
  };

  const handleReadMore = (reclamation) => {
    setSelectedReclamation(reclamation);
  };

  const handleClosePopup = () => {
    setSelectedReclamation(null);
  };

  return (
    <div>
      <div className="col-xl-12 col-md-12">
        <div className="section-headline margin-bottom-30">
          <h4>Reclamations</h4>
        </div>
        <table className="basic-table">
          <tbody>
            <tr>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Description</th>
              <th>Account Type</th>
              <th>Contact</th>
            </tr>

            {reclamations?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={el.user.avatar} alt="" className="user-avatar" />
                  </td>
                  <td>
                    {el.user.firstName} {el.user.lastName}
                  </td>
                  <td>
                    {el.description.length > 50 ? (
                      <>
                        {el.description.substring(0, 50)}...
                        <button onClick={() => handleReadMore(el)}>
                          Read More
                        </button>
                      </>
                    ) : (
                      el.description
                    )}
                  </td>
                  <td>{el.user.role}</td>
                  <td>
                    <button onClick={() => accessChat(el.user._id)}>
                      Contact
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Popup for displaying full reclamation */}
      {selectedReclamation && (
        <div className="popup-wrapper">
          <div className="popup">
            <button className="close-btn" onClick={handleClosePopup}>
              &times;
            </button>
            <h2>Reclamation Details</h2>
            <div className="popup-content">
              <div className="user-avatar">
                <img src={selectedReclamation.user.avatar} alt="" />
              </div>
              <h3>
                {selectedReclamation.user.firstName}{" "}
                {selectedReclamation.user.lastName}
              </h3>
              <p>{selectedReclamation.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reclamations;
