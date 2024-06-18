import React, { useState } from "react";
import upload from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { addTask } from "../../redux/actions/TaskActions";
import { useNavigate } from "react-router-dom";
import { ADD_TASK_LOADING } from "../../redux/constants/actions-types";
const ClientPostTask = () => {
  const { loading } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [skill, setSkill] = useState("");
  const [post, setPost] = useState({
    title: "",
    description: "",
    price: {},
    skills: [],
    attachement: [],
    durationLimit: "",
  });
  const deleteSkill = (skill) => {
    const skills = post.skills.filter((postSkill) => postSkill !== skill);
    setPost({ ...post, skills: skills });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: ADD_TASK_LOADING });
    const images = await Promise.all(
      [...files].map(async (file) => {
        const url = await upload(file);
        return url;
      })
    );

    if ([...files].length > 0) {
      dispatch(addTask({ post: { ...post, attachement: images }, navigate }));
    } else {
      dispatch(addTask({ post, navigate }));
    }
  };
  return (
    <div className="dashboard-content-container">
      <div
        className="simplebar-scroll-content"
        style={{ paddingRight: 17, marginBottom: "-34px" }}
      >
        <div
          className="simplebar-content"
          style={{ paddingBottom: 17, marginRight: "-17px" }}
        >
          <div className="dashboard-content-inner" style={{ minHeight: 281 }}>
            {/* Dashboard Headline */}
            <div className="dashboard-headline">
              <h3>Post a Task</h3>
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
                      <i className="icon-feather-folder-plus" /> Task Submission
                      Form
                    </h3>
                  </div>
                  <div className="content with-padding padding-bottom-10">
                    <div className="row">
                      <div className="col-xl-3">
                        <div className="submit-field">
                          <h5>Project Title</h5>
                          <input
                            type="text"
                            className="with-border"
                            name="title"
                            onChange={(e) =>
                              setPost({ ...post, title: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-xl-3">
                        <div className="submit-field">
                          <h5>Duration Limit</h5>
                          <input
                            type="text"
                            className="with-border"
                            name="title"
                            onChange={(e) =>
                              setPost({
                                ...post,
                                durationLimit: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-xl-3">
                        <div className="submit-field">
                          <h5>Price</h5>
                          <div className="row">
                            <div className="col-xl-6">
                              <div className="input-with-icon">
                                <input
                                  className="with-border"
                                  type="text"
                                  placeholder="Min"
                                  onChange={(e) =>
                                    setPost((prevState) => ({
                                      ...prevState,
                                      price: {
                                        ...prevState.price,
                                        min: e.target.value,
                                      },
                                    }))
                                  }
                                />
                                <i className="currency">TND</i>
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="input-with-icon">
                                <input
                                  className="with-border"
                                  type="text"
                                  placeholder="Max"
                                  onChange={(e) =>
                                    setPost((prevState) => ({
                                      ...prevState,
                                      price: {
                                        ...prevState.price,
                                        max: e.target.value,
                                      },
                                    }))
                                  }
                                />
                                <i className="currency">TND</i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3">
                        <div className="submit-field">
                          <h5>Skills</h5>
                          <div className="keywords-container">
                            <div className="keyword-input-container">
                              <input
                                type="text"
                                className="keyword-input with-border"
                                placeholder="e.g. react js , nodejs"
                                value={skill}
                                onKeyDown={(e) => {
                                  if (e.key == "Enter") {
                                    setPost({
                                      ...post,
                                      skills: [...post.skills, skill],
                                    });
                                    setSkill("");
                                  }
                                }}
                                onChange={(e) => setSkill(e.target.value)}
                              />
                              <button
                                className="keyword-input-button ripple-effect"
                                onClick={() => {
                                  setPost({
                                    ...post,
                                    skills: [...post.skills, skill],
                                  });
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
                              {/* keywords go here */}
                              {post.skills.map((skill, index) => {
                                return (
                                  <span className="keyword" key={index}>
                                    <span
                                      className="keyword-remove"
                                      onClick={() => deleteSkill(skill)}
                                    />
                                    <span className="keyword-text">
                                      {skill}
                                    </span>
                                  </span>
                                );
                              })}
                            </div>
                            <div className="clearfix" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="submit-field">
                          <h5>Project Description</h5>
                          <textarea
                            cols={30}
                            rows={5}
                            className="with-border"
                            defaultValue={""}
                            onChange={(e) =>
                              setPost({ ...post, description: e.target.value })
                            }
                          />
                          <div className="uploadButton margin-top-30">
                            <input
                              className="uploadButton-input"
                              type="file"
                              accept="image/*, application/pdf"
                              id="upload"
                              multiple
                              onChange={(e) => setFiles(e.target.files)}
                            />
                            <label
                              className="uploadButton-button ripple-effect"
                              htmlFor="upload"
                            >
                              Upload Files
                            </label>
                            <span className="uploadButton-file-name">
                              Images or documents that might be helpful in
                              describing your job
                            </span>
                          </div>
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
                      <i className="fa-solid fa-plus" /> Post a Task
                    </>
                  )}
                </a>
              </div>
            </div>
            {/* Row / End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPostTask;
