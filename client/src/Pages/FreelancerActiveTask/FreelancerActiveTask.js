import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { my_process } from "../../redux/actions/FreelancerActions";
import upload, { errorToast } from "../../utils";
import { add_project_link } from "../../redux/actions/FreelancerActions";

const FreelancerActiveTask = () => {
  const { process } = useSelector((state) => state.FreelancerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(my_process());
  }, []);
  const [files, setFiles] = useState(undefined);
  const [projectLink, setProjectLink] = useState("");
  const handleSubmit = async (processId) => {
    if (projectLink.length > 6) {
      dispatch(add_project_link({ projectLink, processId }));
    } else {
      errorToast("You must add valid link or valid file ");
    }
  };
  return (
    <div className="dashboard-content-container" data-simplebar="init">
      <div className="simplebar-scroll-content">
        <div className="simplebar-content">
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
                                        Client : {process.client.firstName}
                                        {process.client.lastName}
                                      </a>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              {/* Task Details */}
                              <ul className="dashboard-task-info">
                                <li>
                                  <strong>
                                    TND
                                    {process.price}
                                  </strong>
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
                                      <div className="uploadButton margin-top-30">
                                        <input
                                          type="text"
                                          className="keyword-input with-border"
                                          placeholder="project link "
                                          onChange={(e) =>
                                            setProjectLink(e.target.value)
                                          }
                                        />
                                        {/* <input
                                          className="uploadButton-input"
                                          type="file"
                                          accept="zip,rar"
                                          id="upload"
                                          onChange={(e) =>
                                            setFiles(e.target.files)
                                          }
                                        />
                                        <label
                                          className="uploadButton-button ripple-effect"
                                          htmlFor="upload"
                                        >
                                          Upload File
                                        </label> */}
                                      </div>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                              {/* Buttons */}
                              <div className="buttons-to-right always-visible">
                                <a
                                  href="#small-dialog"
                                  className="popup-with-zoom-anim button dark ripple-effect ico"
                                  style={{ width: "150px" }}
                                  onClick={() => handleSubmit(process._id)}
                                >
                                  <i className="fa-regular fa-add margin-right-10" />
                                  Add Project Link
                                </a>
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
    </div>
  );
};

export default FreelancerActiveTask;
