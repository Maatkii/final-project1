import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { make_payment, my_process } from "../../redux/actions/clientActions";
import { Link } from "react-router-dom";

const ClientActiveTasks = () => {
  const { process } = useSelector((state) => state.clientReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(my_process());
  }, []);

  const handleMakePayment = (processId) => {
    dispatch(make_payment(processId));
  };
  return (
    <div className="dashboard-content-container" data-simplebar="init">
      <div className="">
        <div className="">
          <div className="dashboard-content-inner" style={{ minHeight: 281 }}>
            {/* Dashboard Headline */}
            <div className="dashboard-headline">
              <h3>My Active Bids</h3>
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
                      <i className="fa-regular fa-gavel" /> Bids List
                    </h3>
                  </div>
                  <div className="content">
                    <ul className="dashboard-box-list">
                      {process !== undefined &&
                        process.map((process, index) => {
                          return (
                            <li key={index}>
                              {/* Task Listing */}
                              <div className="job-listing width-adjustment">
                                {/* Task Listing Details */}
                                <div className="job-listing-details">
                                  {/* Details */}
                                  <div className="job-listing-description">
                                    <h3 className="job-listing-title">
                                      <a href="#">{process.offre.title}</a>
                                      <span
                                        className={`dashboard-status-button ${
                                          process.projectProcess == "ongoing"
                                            ? "green"
                                            : "red"
                                        }`}
                                      >
                                        {process.projectProcess == "ongoing"
                                          ? "On going"
                                          : "Finished"}
                                      </span>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              <div className="job-listing width-adjustment">
                                {/* Task Listing Details */}
                                <div className="job-listing-details">
                                  {/* Details */}
                                  <div className="job-listing-description">
                                    <h3 className="job-listing-title">
                                      <a href="#">
                                        Freelancer :{" "}
                                        {process.freelancer.firstName}
                                        {process.freelancer.lastName}
                                      </a>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              {/* Task Details */}
                              <ul className="dashboard-task-info">
                                <li>
                                  <strong>TND{process.price}</strong>
                                  <span>Fixed Price</span>
                                </li>
                                <li>
                                  <strong>{process.deliveryTime}</strong>
                                  <span>Delivery Time</span>
                                </li>
                                <li>
                                  <strong>
                                    {process.createdAt.slice(0, 10)}
                                  </strong>
                                  <span>Started At</span>
                                </li>
                              </ul>
                              <div className="job-listing width-adjustment">
                                {/* Task Listing Details */}
                                <div className="job-listing-details">
                                  {/* Details */}
                                  <div className="job-listing-description">
                                    <h3 className="job-listing-title">
                                      <a href="#">
                                        Project Link :
                                        <a href={process.projectLink}>
                                          {process.projectLink !== undefined
                                            ? process.projectLink
                                            : " not added yet"}
                                        </a>
                                      </a>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              {/* Buttons */}
                              {process.projectProcess == "ongoing" ? (
                                <div className="buttons-to-right always-visible">
                                  <Link
                                    to="#"
                                    className="popup-with-zoom-anim button dark ripple-effect ico"
                                    style={{ width: "150px" }}
                                    onClick={() =>
                                      handleMakePayment(process._id)
                                    }
                                  >
                                    <i className="fa-regular fa-dollar margin-right-10" />
                                    Make Payment
                                  </Link>
                                  <Link
                                    to="#"
                                    className="button red ripple-effect ico"
                                    style={{ width: "150px" }}
                                  >
                                    <i className="fa-regular fa-trash-alt margin-right-10" />
                                    Cancel Process
                                  </Link>
                                </div>
                              ) : null}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Row / End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientActiveTasks;
