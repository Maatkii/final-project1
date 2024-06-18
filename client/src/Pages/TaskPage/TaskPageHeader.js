import React from "react";
import singleTaskImage from "../../Assets/images/single-task.jpg";
import browseCompanies from "../../Assets/images/browse-companies-02.png";
const TaskPageHeader = ({ taskDetails }) => {
  return (
    <div className="single-page-header">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="single-page-header-inner">
              <div className="left-side">
                <div className="header-image">
                  <a href="#">
                    <img
                      src={
                        taskDetails !== undefined && taskDetails.client.avatar
                      }
                      alt=""
                    />
                  </a>
                </div>
                <div className="header-details">
                  <h3>{taskDetails !== undefined && taskDetails.title}</h3>
                  <h5>About the Employer</h5>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa-regular fa-buildings" />{" "}
                        {`${
                          taskDetails !== undefined &&
                          taskDetails.client.firstName
                        } ${
                          taskDetails !== undefined &&
                          taskDetails.client.lastName
                        }
                        `}
                      </a>
                    </li>
                    <li>
                      <div className="star-rating" data-rating={5.0}>
                        <span className="star" />
                        <span className="star" />
                        <span className="star" />
                        <span className="star" />
                        <span className="star" />
                      </div>
                    </li>
                    {/* <li>
                      <img
                        className="flag"
                        src="https://www.vasterad.com/themes/hireo_21/images/flags/de.svg"
                        alt=""
                      />{" "}
                      Germany
                    </li> */}
                    <li>
                      <div className="verified-badge-with-title">Verified</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="right-side">
                <div className="salary-box">
                  <div className="salary-type">Project Budget</div>
                  <div className="salary-amount">
                    TND{taskDetails !== undefined && taskDetails.price.min} -
                    TND
                    {taskDetails !== undefined && taskDetails.price.max}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="background-image-container"
        style={{ backgroundImage: `url(${singleTaskImage})` }}
      />
    </div>
  );
};

export default TaskPageHeader;
