import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { current } from "../../redux/actions/Actions";
import upload, { errorToast } from "../../utils";
import ClipLoader from "react-spinners/ClipLoader";
import { update_client_profile } from "../../redux/actions/clientActions";
const ClientSettings = () => {
  const { isAuth } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, [isAuth]);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const [updateUser, setUpdateUser] = useState({});
  const { user } = useSelector((state) => state.LoginReducer);

  const handleUploadButtonClick = () => {
    document.querySelector(".file-upload").click();
  };
  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    setFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const [loading, setLoading] = useState(false);
  const handleSubmitChange = async (e) => {
    if (
      updateUser.passwordRepeat === updateUser.newPassword &&
      updateUser.currentPassword !== undefined
    ) {
      setLoading(true);
      let url = undefined;
      e.preventDefault();
      if (file !== "") {
        url = await upload(file);
      }
      if (url !== undefined) {
        dispatch(
          update_client_profile({
            user: { ...updateUser, avatar: url },
            setLoading,
          })
        );
      } else {
        dispatch(update_client_profile({ user: updateUser, setLoading }));
      }
    } else {
      errorToast("Password & Password Repeat Does Not Match !");
    }
  };
  return (
    <div className="dashboard-content-container">
      <div className="dashboard-content-inner" style={{ minHeight: 237 }}>
        {/* Dashboard Headline */}
        <div className="dashboard-headline">
          <h3>Settings</h3>
          {/* Breadcrumbs */}
          <nav id="breadcrumbs" className="dark">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>Settings</li>
            </ul>
          </nav>
        </div>
        {/* Row */}
        <div className="row">
          {/* Dashboard Box */}
          <div className="col-xl-12">
            <div className="dashboard-box margin-top-0">
              {/* Headline */}
              <div className="headline">
                <h3>
                  <i className="fa-regular fa-user-circle" /> My Account
                </h3>
              </div>
              <div className="content with-padding padding-bottom-0">
                <div className="row">
                  <div className="col-auto">
                    <div className="avatar-wrapper">
                      <img
                        className="profile-pic"
                        src={image !== "" ? image : user.avatar}
                        alt="avatar"
                      />
                      <div
                        className="upload-button"
                        onClick={handleUploadButtonClick}
                      />
                      <input
                        className="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>First Name</h5>
                          <input
                            name="firstName"
                            type="text"
                            className="with-border"
                            defaultValue={user.firstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Last Name</h5>
                          <input
                            name="lastName"
                            type="text"
                            className="with-border"
                            defaultValue={user.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6">
                        <div className="submit-field">
                          <h5>Email</h5>
                          <input
                            type="text"
                            disabled={true}
                            className="with-border"
                            value={user.email}
                            // onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div id="test1" className="dashboard-box">
              {/* Headline */}
              <div className="headline">
                <h3>
                  <i className="fa-regular fa-lock-alt" /> Password &amp;
                  Security
                </h3>
              </div>
              <div className="content with-padding">
                <div className="row">
                  <div className="col-xl-4">
                    <div className="submit-field">
                      <h5>Current Password</h5>
                      <input
                        name="currentPassword"
                        type="password"
                        className="with-border"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="submit-field">
                      <h5>New Password</h5>
                      <input
                        name="newPassword"
                        type="password"
                        className="with-border"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="submit-field">
                      <h5>Repeat New Password</h5>
                      <input
                        type="password"
                        className="with-border"
                        name="passwordRepeat"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="col-xl-12">
            <a
              href="#"
              className="button ripple-effect big margin-top-30"
              onClick={handleSubmitChange}
            >
              {loading ? <ClipLoader color="#fff" size={20} /> : "Save Changes"}
            </a>
          </div>
        </div>
        {/* Row / End */}
      </div>
    </div>
  );
};

export default ClientSettings;
