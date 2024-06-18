import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import ModalAddExperience from "./ModalAddExperience";
import { Form, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { current } from "../../redux/actions/Actions";
import {
  freelancerUpdateProfile,
  getFreelancerPortfolio,
} from "../../redux/actions/FreelancerActions";
import upload from "../../utils";
import { UPDATE_FREELANCER_PROFILE } from "../../redux/constants/actions-types";
import ClipLoader from "react-spinners/ClipLoader";
const FreelancerSettings = () => {
  const { isAuth } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
    dispatch(getFreelancerPortfolio());
  }, [isAuth]);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [skill, setSkill] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [behanceLink, setBehanceLink] = useState("");
  const [dribbleLink, setDribbleLink] = useState("");
  const [updateUser, setUpdateUser] = useState({});
  const { freelancerPortfolio, loading } = useSelector(
    (state) => state.FreelancerReducer
  );

  const handleClose = () => {
    setShow(false);
  };

  const handleUploadButtonClick = () => {
    document.querySelector(".file-upload").click();
  };
  const handleChange = (e) => {
    setUpdateUser({ [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    setFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmitChange = async (e) => {
    dispatch({ type: UPDATE_FREELANCER_PROFILE });
    let url = undefined;
    e.preventDefault();
    if (file !== "") {
      url = await upload(file);
    }
    if (url !== undefined) {
      dispatch(
        freelancerUpdateProfile({
          updateUser: { ...updateUser, avatar: url },
          freelancerPortfolio,
        })
      );
    } else {
      dispatch(freelancerUpdateProfile({ updateUser, freelancerPortfolio }));
    }
  };
  return (
    <div className="dashboard-content-container">
      {freelancerPortfolio !== undefined ? (
        <div
          className="simplebar-scroll-content"
          style={{ paddingRight: 17, marginBottom: "-34px" }}
        >
          <div
            className="simplebar-content"
            style={{ paddingBottom: 17, marginRight: "-17px" }}
          >
            <div className="dashboard-content-inner" style={{ minHeight: 237 }}>
              {/* Dashboard Headline */}
              <div className="dashboard-headline">
                <h3>Settings</h3>
                {/* Breadcrumbs */}
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
                              src={
                                image !== ""
                                  ? image
                                  : freelancerPortfolio.user.avatar
                              }
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
                                  defaultValue={
                                    freelancerPortfolio.user.firstName
                                  }
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
                                  defaultValue={
                                    freelancerPortfolio.user.lastName
                                  }
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
                                  value={freelancerPortfolio.user.email}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Dashboard Box */}
                <div className="col-xl-12">
                  <div className="dashboard-box">
                    {/* Headline */}
                    <div className="headline">
                      <h3>
                        <i className="fa-regular fa-face-smile-beam" /> My
                        Profile
                      </h3>
                    </div>
                    <div className="content">
                      <ul className="fields-ul">
                        <li>
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="submit-field">
                                <h5>Skills </h5>
                                {/* Skills List */}
                                <div className="keywords-container">
                                  <div className="keyword-input-container">
                                    <input
                                      type="text"
                                      className="keyword-input with-border"
                                      placeholder="e.g. Angular, Laravel"
                                      value={skill}
                                      onKeyDown={(e) => {
                                        if (e.key == "Enter") {
                                          freelancerPortfolio.skills = [
                                            ...freelancerPortfolio.skills,
                                            { name: skill },
                                          ];
                                          setSkill("");
                                        }
                                      }}
                                      onChange={(e) => setSkill(e.target.value)}
                                    />
                                    <button
                                      className="keyword-input-button ripple-effect"
                                      onClick={() => {
                                        freelancerPortfolio.skills = [
                                          ...freelancerPortfolio.skills,
                                          { name: skill },
                                        ];
                                        setSkill("");
                                      }}
                                    >
                                      <i className="fa-solid fa-plus" />
                                    </button>
                                  </div>
                                  <div
                                    className="keywords-list"
                                    style={{ height: "auto" }}
                                  >
                                    {freelancerPortfolio !== undefined
                                      ? freelancerPortfolio.skills.map(
                                          (skill, index) => {
                                            return (
                                              <span
                                                className="keyword"
                                                key={index}
                                              >
                                                <span className="keyword-remove" />
                                                <span className="keyword-text">
                                                  {skill.name}
                                                </span>
                                              </span>
                                            );
                                          }
                                        )
                                      : null}
                                  </div>
                                  <div className="clearfix" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="submit-field">
                                <div className="d-flex justify-content-between align-items-center">
                                  <h5>Experience </h5>
                                  <button
                                    className="add-input-button "
                                    onClick={() => setShow(true)}
                                  >
                                    <i className="fa-solid fa-plus"></i>
                                  </button>
                                </div>
                                <ModalAddExperience
                                  show={show}
                                  handleClose={handleClose}
                                  freelancerPortfolio={freelancerPortfolio}
                                />

                                {/* Skills List */}

                                <li>
                                  <ul className="boxed-list-ul">
                                    {freelancerPortfolio !== undefined
                                      ? freelancerPortfolio.experience.map(
                                          (exp, index) => {
                                            return (
                                              <li>
                                                <div className="boxed-list-item">
                                                  {/* Avatar */}
                                                  {/* <div className="item-image">
                                                  <img
                                                    src="images/browse-companies-04.png"
                                                    alt=""
                                                  />
                                                </div> */}
                                                  {/* Content */}
                                                  <div className="item-content">
                                                    <h4>
                                                      <a href="#">
                                                        {exp.title}
                                                      </a>
                                                    </h4>
                                                    <div className="item-details margin-top-7">
                                                      <div className="detail-item">
                                                        <a href="#">
                                                          <i className="fa-regular fa-buildings" />{" "}
                                                          {exp.companyName}
                                                        </a>
                                                      </div>
                                                      <div className="detail-item">
                                                        <i className="icon-material-outline-date-range" />{" "}
                                                        {exp.startDate} -{" "}
                                                        {exp.endDate}
                                                      </div>
                                                    </div>
                                                    <div className="item-description">
                                                      <p>{exp.description} </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                            );
                                          }
                                        )
                                      : null}
                                  </ul>
                                </li>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="row">
                            <div className="col-xl-6">
                              <div className="submit-field">
                                <h5>Tag Line</h5>
                                <input
                                  type="text"
                                  className="with-border"
                                  defaultValue={
                                    freelancerPortfolio &&
                                    freelancerPortfolio.tagLine
                                  }
                                  onChange={(e) => setTagLine(e.target.value)}
                                  onBlur={() =>
                                    (freelancerPortfolio.tagLine = tagLine)
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-xl-12">
                              <div className="submit-field">
                                <h5>Introduce Yourself</h5>
                                <textarea
                                  cols={30}
                                  rows={5}
                                  className="with-border"
                                  defaultValue={
                                    freelancerPortfolio &&
                                    freelancerPortfolio.description
                                  }
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  onBlur={() =>
                                    (freelancerPortfolio.description =
                                      description)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-xl-12">
                              <div className="submit-field">
                                <h5>Social Links</h5>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text id="basic-addon1">
                                    <i className="fa-brands fa-github"></i>
                                  </InputGroup.Text>
                                  <Form.Control
                                    placeholder="Github link"
                                    type="text"
                                    className="social-input"
                                    defaultValue={
                                      freelancerPortfolio &&
                                      (freelancerPortfolio.socialMediaLinks[0]
                                        ?.link ||
                                        "")
                                    }
                                    onBlur={() =>
                                      (freelancerPortfolio.socialMediaLinks[0] =
                                        {
                                          name: "github",
                                          link: githubLink,
                                        })
                                    }
                                    onChange={(e) =>
                                      setGithubLink(e.target.value)
                                    }
                                  />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text id="basic-addon1">
                                    <i className="fa-regular fa-basketball"></i>
                                  </InputGroup.Text>
                                  <Form.Control
                                    placeholder="dribble link"
                                    type="text"
                                    className="social-input"
                                    defaultValue={
                                      freelancerPortfolio &&
                                      (freelancerPortfolio.socialMediaLinks[2]
                                        ?.link ||
                                        "")
                                    }
                                    onChange={(e) =>
                                      setDribbleLink(e.target.value)
                                    }
                                    onBlur={() =>
                                      (freelancerPortfolio.socialMediaLinks[2] =
                                        {
                                          name: "dribbble",
                                          link: dribbleLink,
                                        })
                                    }
                                  />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                  <InputGroup.Text id="basic-addon1">
                                    <i className="fa-brands fa-behance"></i>
                                  </InputGroup.Text>
                                  <Form.Control
                                    placeholder="behance link"
                                    type="text"
                                    defaultValue={
                                      freelancerPortfolio &&
                                      (freelancerPortfolio.socialMediaLinks[1]
                                        ?.link ||
                                        "")
                                    }
                                    className="social-input"
                                    onChange={(e) =>
                                      setBehanceLink(e.target.value)
                                    }
                                    onBlur={() =>
                                      (freelancerPortfolio.socialMediaLinks[1] =
                                        {
                                          name: "behance",
                                          link: behanceLink,
                                        })
                                    }
                                  />
                                </InputGroup>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
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
                    {loading ? (
                      <ClipLoader color="#fff" size={20} />
                    ) : (
                      "Save Changes"
                    )}
                  </a>
                </div>
              </div>
              {/* Row / End */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FreelancerSettings;
