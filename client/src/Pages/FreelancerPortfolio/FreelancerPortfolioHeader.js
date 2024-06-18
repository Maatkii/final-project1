import React, { useState } from "react";
import singleFreelancer from "../../Assets/images/single-freelancer.jpg";
const FreelancerPortfolioHeader = ({ freelancerDetails }) => {
  // const [freelancerDetails, setFreelancerDetails] = useState({
  //   profileImage:
  //     "https://www.vasterad.com/themes/hireo_21/images/user-avatar-big-02.jpg",
  //   name: "David Peterson",
  //   rate: 5,
  // });
  return (
    <div>
      <div className="single-page-header freelancer-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="single-page-header-inner">
                <div className="left-side">
                  <div className="header-image freelancer-avatar">
                    <img
                      src={
                        freelancerDetails !== undefined &&
                        freelancerDetails.user.avatar
                      }
                      alt=""
                    />
                  </div>
                  <div className="header-details">
                    <h3>
                      {`${
                        freelancerDetails !== undefined &&
                        freelancerDetails.user.firstName
                      } ${
                        freelancerDetails !== undefined &&
                        freelancerDetails.user.lastName
                      }`}
                      <span>
                        {freelancerDetails !== undefined &&
                          freelancerDetails.tagLine}
                      </span>
                    </h3>
                    <ul>
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
                        <div className="verified-badge-with-title">
                          Verified
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="background-image-container"
          style={{ backgroundImage: `url(${singleFreelancer})` }}
        />
      </div>
    </div>
  );
};

export default FreelancerPortfolioHeader;
