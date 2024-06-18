import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add_reclamation } from "../../redux/actions/Actions";
import ClipLoader from "react-spinners/ClipLoader";
import UserReclamations from "../UsersReclamations/UsersReclamations";

const AddReclamation = () => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(add_reclamation({ description, setLoading, setDescription }));
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
                <i className="icon-feather-folder-plus" /> Reclamation
                Submission Form
              </h3>
            </div>
            <div className="content with-padding padding-bottom-10">
              <div className="row">
                <div className="col-xl-12">
                  <div className="submit-field">
                    <h5>Description</h5>
                    <textarea
                      cols={30}
                      rows={5}
                      className="with-border"
                      defaultValue={description}
                      onChange={(e) => setDescription(e.target.value)}
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
      <UserReclamations />
    </div>
  );
};

export default AddReclamation;
