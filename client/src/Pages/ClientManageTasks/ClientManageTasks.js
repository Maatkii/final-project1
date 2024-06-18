import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, getClientTask } from "../../redux/actions/TaskActions";
import ModalUpdateTask from "./ModalUpdateTask";
const ClientManageTasks = () => {
  const dispatch = useDispatch();
  const [updateTask, setUpdateTask] = useState({
    title: "",
    description: "",
    price: {},
    skills: [],
    images: [],
    durationLimit: "",
  });
  const [show, setShow] = useState(false);
  const { client_tasks } = useSelector((state) => state.taskReducer);

  useEffect(() => {
    dispatch(getClientTask());
  }, []);

  return (
    <div className="dashboard-content-container">
      <div className="simplebar-scroll-content">
        <div style={{ padding: "0 0 20px 0" }}>
          <div className="dashboard-content-inner" style={{ minHeight: 281 }}>
            {/* Dashboard Headline */}
            <div className="dashboard-headline">
              <h3>Manage Tasks</h3>
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
                      <i className="fa-regular fa-suitcase" /> My Tasks Listings
                    </h3>
                  </div>
                  <div className="content">
                    <ul className="dashboard-box-list">
                      {client_tasks.length > 0 &&
                        client_tasks.map((clientTask, index) => {
                          return (
                            <li key={index}>
                              {/* Job Listing */}
                              <div className="job-listing">
                                {/* Job Listing Details */}
                                <div className="job-listing-details">
                                  {/* Logo */}
                                  {/* <Link
                                    to={`/manage-condidates/1`}
                                    className="job-listing-company-logo"
                                  >
                                    <img
                                      src="images/company-logo-05.png"
                                      alt=""
                                    />
                                  </Link> */}
                                  {/* Details */}
                                  <div className="job-listing-description">
                                    <h3 className="job-listing-title">
                                      <a href="#">{clientTask.title}</a>{" "}
                                      <span
                                        className={`dashboard-status-button ${
                                          clientTask.offerSituation == "open"
                                            ? "green"
                                            : "red"
                                        }`}
                                      >
                                        {clientTask.offerSituation == "open"
                                          ? "Pending Approval"
                                          : "Closed"}
                                      </span>
                                    </h3>
                                    {/* Job Listing Footer */}
                                    <div className="job-listing-footer">
                                      <ul>
                                        <li>
                                          <i className="fa-regular fa-calendar-alt" />{" "}
                                          {`Posted on ${clientTask.postedDate.slice(
                                            0,
                                            10
                                          )}`}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Buttons */}
                              <div className="buttons-to-right always-visible">
                                <Link
                                  className="button ripple-effect"
                                  to={
                                    clientTask.offerSituation == "open"
                                      ? `/manage-condidates/${clientTask._id}`
                                      : null
                                  }
                                >
                                  <i className="fa-regular fa-user-group" />{" "}
                                  Manage Candidates{" "}
                                  <span className="button-info">
                                    {clientTask.proposals.length}
                                  </span>
                                </Link>
                                {clientTask.offerSituation == "open" ? (
                                  <>
                                    {" "}
                                    <Link
                                      to="#"
                                      className="button gray ripple-effect ico"
                                      onClick={() => {
                                        setUpdateTask(clientTask);
                                        setShow(true);
                                      }}
                                    >
                                      <i className="fa-duotone fa-pen-to-square" />
                                    </Link>
                                    <Link
                                      to="#"
                                      className="button gray ripple-effect ico"
                                      onClick={() =>
                                        dispatch(deleteTask(clientTask._id))
                                      }
                                    >
                                      <i className="fa-duotone fa-trash-alt" />
                                    </Link>
                                  </>
                                ) : null}
                              </div>
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
      <ModalUpdateTask
        updateTask={updateTask}
        setUpdateTask={setUpdateTask}
        show={show}
        setShow={setShow}
      />
    </div>
  );
};

export default ClientManageTasks;
