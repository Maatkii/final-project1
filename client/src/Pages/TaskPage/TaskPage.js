import React, { useState, useEffect } from "react";
import TaskPageHeader from "./TaskPageHeader";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { get_Tasks_details } from "../../redux/actions/TaskActions";
import { useParams, Link } from "react-router-dom";
import { calculateTimeSince } from "../../utils";
import { Form } from "react-bootstrap";
import { addProposal } from "../../redux/actions/FreelancerActions";
import { ADD_PROPOSAL_LOADING } from "../../redux/constants/actions-types";
import ClipLoader from "react-spinners/ClipLoader";
const TaskPage = () => {
  const { taskDetails } = useSelector((state) => state.taskReducer);
  const { loading } = useSelector((state) => state.FreelancerReducer);
  const { user, isAuth } = useSelector((state) => state.LoginReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState([0, 0]);
  const [counter, setCounter] = useState(1);
  const [proposal, setProposal] = useState({
    deliveryTime: { number: counter },
  });
  const handleCounter = (condition) => {
    if (condition == "inc") {
      setCounter(counter + 1);
      setProposal({
        ...proposal,
        deliveryTime: { ...proposal.deliveryTime, number: counter + 1 },
      });
    } else if (condition == "dec" && counter > 1) {
      setCounter(counter - 1);
      setProposal({
        ...proposal,
        deliveryTime: { ...proposal.deliveryTime, number: counter - 1 },
      });
    }
  };

  useEffect(() => {
    dispatch(get_Tasks_details(id));
  }, []);
  useEffect(() => {
    if (taskDetails !== undefined) {
      setValue([taskDetails.price.min, taskDetails.price.max]);
    }
  }, [taskDetails]);

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    dispatch({ type: ADD_PROPOSAL_LOADING });
    dispatch(addProposal({ proposal: { ...proposal, price: value[1] }, id }));
  };

  return (
    <div>
      <TaskPageHeader taskDetails={taskDetails} />
      <div className="container">
        <div className="row">
          {/* Content */}
          <div className="col-xl-8 col-lg-8 content-right-offset">
            {/* Description */}
            <div className="single-page-section">
              <h3 className="margin-bottom-25">Project Description</h3>
              {taskDetails !== undefined && taskDetails.description}
            </div>
            {/* Atachments */}
            <div className="single-page-section">
              <h3>
                {taskDetails !== undefined && taskDetails.attachement.length > 0
                  ? "Attachments"
                  : ""}
              </h3>
              <div className="attachments-container">
                {taskDetails !== undefined &&
                  taskDetails.attachement.map((file, index) => {
                    return (
                      <a
                        href={file}
                        target="_blank"
                        className="attachment-box ripple-effect"
                      >
                        <span>File {index + 1}</span>
                        <i>{file.slice(-3).toUpperCase()}</i>
                      </a>
                    );
                  })}
              </div>
            </div>
            {/* Skills */}
            <div className="single-page-section">
              <h3>Skills Required</h3>
              <div className="task-tags">
                {taskDetails !== undefined &&
                  taskDetails.skills.map((skill, index) => {
                    return <span key={index}>{skill}</span>;
                  })}
              </div>
            </div>
            {/* Duration */}
            <div className="single-page-section">
              <h3>Maximum Duration</h3>
              <div className="task-tags">
                <span>
                  {taskDetails !== undefined && taskDetails.durationLimit}
                </span>
              </div>
            </div>
            <div className="clearfix" />
            {/* Freelancers Bidding */}
            <div className="boxed-list margin-bottom-60">
              <div className="boxed-list-headline">
                <h3>
                  <i className="fa-regular fa-users" /> Freelancers Bidding
                </h3>
              </div>
              <ul className="boxed-list-ul">
                {taskDetails?.proposals?.map((proposal, index) => {
                  return (
                    <li>
                      <div className="bid">
                        <div className="bids-avatar">
                          <div className="freelancer-avatar">
                            <div className="verified-badge" />
                            <a>
                              <img src={proposal.freelancer.avatar} alt="" />
                            </a>
                          </div>
                        </div>
                        <div className="bids-content">
                          <div className="freelancer-name">
                            <h4>
                              <a>
                                {proposal.freelancer.firstName}{" "}
                                {proposal.freelancer.lastName}
                              </a>
                            </h4>
                            <div className="star-rating" data-rating="4.9">
                              <span className="star" />
                              <span className="star" />
                              <span className="star" />
                              <span className="star" />
                              <span className="star" />
                            </div>
                          </div>
                        </div>
                        <div className="bids-bid">
                          <div className="bid-rate">
                            <div className="rate">TND{proposal.price}</div>
                            <span>
                              {proposal.deliveryTime.number}{" "}
                              {proposal.deliveryTime.period}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Sidebar */}
          <div className="col-xl-4 col-lg-4">
            <div className="sidebar-container">
              <div className="countdown green margin-bottom-35">
                {taskDetails !== undefined &&
                  calculateTimeSince(taskDetails.postedDate)}
              </div>
              {user.role === "freelancer" ? (
                <div className="sidebar-widget">
                  <div className="bidding-widget">
                    <div className="bidding-headline">
                      <h3>Bid on this job!</h3>
                    </div>
                    <div className="bidding-inner">
                      {/* Headline */}
                      <span className="bidding-detail margin-bottom-20">
                        Set your <strong>Price: TND{value[1]}</strong>
                      </span>
                      {/* Price Slider */}
                      <RangeSlider
                        min={taskDetails !== undefined && taskDetails.price.min}
                        max={taskDetails !== undefined && taskDetails.price.max}
                        value={value}
                        onInput={setValue}
                        className="single-thumb"
                        rangeSlideDisabled={true}
                        thumbsDisabled={[true, false]}
                      />

                      <span className="bidding-detail margin-top-30">
                        Set your <strong>delivery time</strong>
                      </span>
                      <div className="bidding-fields">
                        <div className="bidding-field">
                          {/* Quantity Buttons */}
                          <div className="qtyButtons">
                            <div
                              className="fa-solid fa-minus d-flex justify-content-center align-items-center qtyDec"
                              onClick={() => handleCounter("dec")}
                            />
                            <input
                              type="text"
                              name="qtyInput"
                              defaultValue={counter}
                              value={counter}
                            />
                            <div
                              className="fa-solid fa-plus d-flex justify-content-center align-items-center qtyInc"
                              onClick={() => handleCounter("inc")}
                            />
                          </div>
                        </div>
                        <div className="bidding-field">
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(e) =>
                              setProposal({
                                ...proposal,
                                deliveryTime: {
                                  ...proposal.deliveryTime,
                                  period: e.target.value,
                                },
                              })
                            }
                          >
                            <option>Select</option>
                            <option value="Hours">Hours</option>
                            <option value="Days">Days</option>
                            <option value="Month">Month</option>
                          </Form.Select>
                        </div>
                      </div>
                      <span className="bidding-detail margin-top-30 margin-bottom-20">
                        Set your <strong>Proposal Description</strong>
                      </span>
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a Description here"
                          id="floatingTextarea"
                          onChange={(e) =>
                            setProposal({
                              ...proposal,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                        <label for="floatingTextarea">
                          Additional Proposal Description
                        </label>
                      </div>
                      {/* Button */}
                      <button
                        id="snackbar-place-bid"
                        className="button ripple-effect move-on-hover full-width margin-top-30"
                        onClick={handleSubmitProposal}
                      >
                        <span>
                          {loading ? (
                            <ClipLoader color="#fff" size={20} />
                          ) : (
                            "Place a Proposal"
                          )}
                        </span>
                      </button>
                    </div>
                    {!isAuth ? (
                      <div className="bidding-signup">
                        Don't have an account?{" "}
                        <Link
                          to="register"
                          className="register-tab sign-in popup-with-zoom-anim"
                        >
                          Sign Up
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
