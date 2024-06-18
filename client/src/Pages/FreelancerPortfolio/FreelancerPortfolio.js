import React, { useState, useEffect } from "react";
import FreelancerPortfolioHeader from "./FreelancerPortfolioHeader";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_freelancer_details } from "../../redux/actions/clientActions";
const FreelancerPortfolio = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(get_freelancer_details(id));
  }, []);
  const { freelancerDetails } = useSelector((state) => state.clientReducer);

  return (
    <div>
      <FreelancerPortfolioHeader freelancerDetails={freelancerDetails} />
      <div className="container">
        <div className="row">
          {/* Content */}
          <div className="col-xl-8 col-lg-8 content-right-offset">
            {/* Page Content */}
            <div className="single-page-section">
              <h3 className="margin-bottom-25">About Me</h3>
              <p>
                {freelancerDetails !== undefined &&
                  freelancerDetails.description}{" "}
              </p>
            </div>
            {/* Boxed List */}
            <div className="boxed-list margin-bottom-60">
              <div className="boxed-list-headline">
                <h3>
                  <i className="fa-regular fa-thumbs-up"></i>
                  Work History and Feedback
                </h3>
              </div>
              <ul className="boxed-list-ul">
                {/* {freelancerDetails.feedback.map((feedback, index) => {
                  return (
                    <li>
                      <div className="boxed-list-item">
                         <div className="item-content">
                          <h4>
                            Web, Database and API Developer{" "}
                            <span>Rated as Freelancer</span>
                          </h4>
                          <div className="item-details margin-top-10">
                            <div className="star-rating" data-rating={5.0}>
                              <span className="star" />
                              <span className="star" />
                              <span className="star" />
                              <span className="star" />
                              <span className="star" />
                            </div>
                            <div className="detail-item">
                              <i className="icon-material-outline-date-range" />{" "}
                              August 2019
                            </div>
                          </div>
                          <div className="item-description">
                            <p>
                              Excellent programmer - fully carried out my
                              project in a very professional manner.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })} */}
              </ul>
              {/* Pagination */}
              <div className="clearfix" />
              {/* <div className="pagination-container margin-top-40 margin-bottom-10">
                <nav className="pagination">
                  <ul>
                    <li>
                      <a href="#" className="ripple-effect current-page">
                        1
                      </a>
                    </li>
                    <li>
                      <a href="#" className="ripple-effect">
                        2
                      </a>
                    </li>
                    <li className="pagination-arrow">
                      <a href="#" className="ripple-effect">
                        <i className="fa-regular fa-arrow-right" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div> */}
              <div className="clearfix" />
              {/* Pagination / End */}
            </div>
            {/* Boxed List / End */}
            {/* Boxed List */}
            <div className="boxed-list margin-bottom-60">
              <div className="boxed-list-headline">
                <h3>
                  <i className="fa-regular fa-buildings" /> Employment History
                </h3>
              </div>

              <ul className="boxed-list-ul">
                {freelancerDetails !== undefined &&
                  freelancerDetails.experience.map((exp, index) => {
                    return (
                      <li>
                        <div className="boxed-list-item">
                          {/* Avatar */}
                          {/* <div className="item-image">
                    <img src="images/browse-companies-04.png" alt="" />
                  </div> */}
                          {/* Content */}
                          <div className="item-content">
                            <h4>
                              <a href="#">{exp.title}</a>
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
                                {exp.startDate} - {exp.endDate}
                              </div>
                            </div>
                            <div className="item-description">
                              <p>{exp.description} </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            {/* Boxed List / End */}
          </div>
          {/* Sidebar */}
          <div className="col-xl-4 col-lg-4">
            <div className="sidebar-container">
              {/* Widget */}
              <div className="sidebar-widget">
                <h3>Social Profiles</h3>
                <div className="freelancer-socials margin-top-25">
                  <ul>
                    {freelancerDetails !== undefined &&
                      freelancerDetails.socialMediaLinks.map(
                        (social, index) => {
                          return (
                            <li key={index}>
                              <a href={`http://${social.link}`} target="_blank">
                                <i
                                  className={`fa-brands fa-square-${social.name}`}
                                ></i>
                              </a>
                            </li>
                          );
                        }
                      )}
                  </ul>
                </div>
              </div>
              {/* Widget */}
              <div className="sidebar-widget">
                <h3>Skills</h3>
                <div className="task-tags">
                  {freelancerDetails !== undefined &&
                    freelancerDetails.skills.map((skill, index) => {
                      return <span key={index}>{skill.name}</span>;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerPortfolio;
