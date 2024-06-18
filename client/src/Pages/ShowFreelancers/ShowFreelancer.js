import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_freelancers_profile } from "../../redux/actions/clientActions";
const ShowFreelancer = () => {
  const { freelancersList } = useSelector((state) => state.clientReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_freelancers_profile());
  }, []);
  return (
    <div className="full-page-content-inner">
      {/* Freelancers List Container */}
      <div className="freelancers-container freelancers-grid-layout margin-top-35">
        {/*Freelancer */}
        {freelancersList?.map((freelancer, index) => {
          return (
            <div className="freelancer" key={index}>
              {/* Overview */}
              <div className="freelancer-overview">
                <div className="freelancer-overview-inner">
                  {/* Bookmark Icon */}
                  {/* Avatar */}
                  <div className="freelancer-avatar">
                    <div className="verified-badge" />
                    <a to="#">
                      <img src={freelancer.avatar} alt="avatar" />
                    </a>
                  </div>
                  {/* Name */}
                  <div className="freelancer-name">
                    <h4>
                      <a to="#">
                        {`${freelancer.firstName} ${freelancer.lastName}`}
                      </a>
                    </h4>
                    <span>{freelancer.tagName}</span>
                  </div>
                  {/* Rating */}
                </div>
              </div>
              {/* Details */}
              <div className="freelancer-details">
                <Link
                  to={`/freelancer-details/${freelancer._id}`}
                  className="button button-sliding-icon ripple-effect"
                >
                  View Profile{" "}
                  <i className="icon-material-outline-arrow-right-alt" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowFreelancer;
