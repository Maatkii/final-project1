import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  accept_process,
  get_proposals,
} from "../../redux/actions/clientActions";
import { add_Chat, add_selectedChat } from "../../redux/actions/chatActions";
import axios from "axios";
import { url } from "../../utils";
import { toast } from "react-toastify";
const ClientManageCondidates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { proposals } = useSelector((state) => state.clientReducer);
  const { chats } = useSelector((state) => state.ChatReducer);

  useEffect(() => {
    dispatch(get_proposals(id));
  }, []);
  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const { data } = await axios.post(
        `${url}/api/v1/chat`,
        {
          userId,
        },
        config
      );
      if (!chats.find((c) => c._id === data._id))
        dispatch(add_Chat([data, ...chats]));
      dispatch(add_selectedChat(data));
      navigate("/messages");
      // setLoadingChat(false);
      // setLoading(false);
      // setSearchResult([]);
    } catch (error) {
      toast.error(error);
    }
  };
  const handleAcceptOffer = (proposal) => {
    let offerAccepted = {};
    offerAccepted.offerId = id;
    offerAccepted.proposalId = proposal._id;
    offerAccepted.freelancerId = proposal.freelancer._id;
    offerAccepted.price = proposal.price;
    offerAccepted.deliveryTime = `${proposal.deliveryTime.number} ${proposal.deliveryTime.period}`;
    dispatch(accept_process({ offerAccepted, navigate }));
  };
  return (
    <div className="dashboard-content-container" data-simplebar="init">
      <div
        className="simplebar-scroll-content"
        style={{ paddingRight: 17, marginBottom: "-34px" }}
      >
        <div className="" style={{ paddingBottom: 17, marginRight: "-17px" }}>
          {proposals !== undefined ? (
            <div className="dashboard-content-inner" style={{ minHeight: 281 }}>
              {/* Dashboard Headline */}
              <div className="dashboard-headline">
                <h3>Manage Candidates</h3>
                <span className="margin-top-7">
                  Job Applications for <a href="#">{proposals.title}</a>
                </span>
                {/* Breadcrumbs */}
                <nav id="breadcrumbs" className="dark">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Dashboard</a>
                    </li>
                    <li>Manage Candidates</li>
                  </ul>
                </nav>
              </div>
              {/* Row */}
              <div className="row">
                {/* Dashboard Box */}
                <div className="col-xl-12">
                  <div className="dashboard-box margin-top-0">
                    {/* Headline */}
                    <div className="headline">
                      <h3>
                        <i className="fa-regular fa-user-group" />{" "}
                        {proposals.proposals.length} Candidates
                      </h3>
                    </div>
                    <div className="content">
                      <ul className="dashboard-box-list">
                        {proposals.proposals.map((proposal, index) => {
                          return (
                            <li key={index}>
                              <div className="freelancer-overview manage-candidates">
                                <div className="freelancer-overview-inner">
                                  {/* Avatar */}
                                  <div className="freelancer-avatar">
                                    <div className="verified-badge" />
                                    <a href="#">
                                      <img
                                        src={proposal.freelancer.avatar}
                                        alt=""
                                      />
                                    </a>
                                  </div>
                                  {/* Name */}
                                  <div className="freelancer-name">
                                    <h4>
                                      <Link
                                        to={`/freelancer-details/${proposal.freelancer._id}`}
                                      >
                                        {`${proposal.freelancer.firstName} ${proposal.freelancer.lastName}`}
                                        {/* <img
                                      className="flag"
                                      src="https://www.vasterad.com/themes/hireo_21/images/flags/de.svg"
                                      alt=""
                                      data-tippy-placement="top"
                                      data-tippy=""
                                      data-original-title="Australia"
                                    /> */}
                                      </Link>
                                    </h4>
                                    {/* Details */}
                                    <span className="freelancer-detail-item">
                                      <a href="#">
                                        <i className="fa-regular fa-envelope" />{" "}
                                        {proposal.freelancer.email}
                                      </a>
                                    </span>
                                    <span className="freelancer-detail-item">
                                      <i className="fa-regular fa-phone" />{" "}
                                      {`(+216) ${proposal.freelancer.phoneNumber}`}
                                    </span>
                                    {/* Rating */}
                                    <div className="freelancer-rating">
                                      <div
                                        className="star-rating"
                                        data-rating={5.0}
                                      >
                                        <span className="star" />
                                        <span className="star" />
                                        <span className="star" />
                                        <span className="star" />
                                        <span className="star" />
                                      </div>
                                    </div>
                                    <ul className="dashboard-task-info bid-info">
                                      <li>
                                        <strong>TND{proposal.price}</strong>
                                        <span>Fixed Price</span>
                                      </li>
                                      <li>
                                        <strong>{`${proposal.deliveryTime.number} ${proposal.deliveryTime.period}`}</strong>
                                        <span>Delivery Time</span>
                                      </li>
                                    </ul>

                                    {/* Buttons */}
                                    <div className="buttons-to-right always-visible margin-top-25 margin-bottom-5">
                                      <a
                                        href="#"
                                        className="button ripple-effect"
                                        onClick={() =>
                                          handleAcceptOffer(proposal)
                                        }
                                      >
                                        <i className="fa-regular fa-check" />{" "}
                                        Accept Offer
                                      </a>
                                      <Link
                                        to="#"
                                        className="popup-with-zoom-anim button dark ripple-effect"
                                        onClick={() =>
                                          accessChat(proposal.freelancer._id)
                                        }
                                      >
                                        <i className="fa-regular fa-message" />{" "}
                                        Send Message
                                      </Link>
                                      <a
                                        href="#"
                                        className="button gray ripple-effect ico"
                                        data-tippy-placement="top"
                                        data-tippy=""
                                        data-original-title="Remove Candidate"
                                      >
                                        <i className="fa-regular fa-trash-alt" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
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
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ClientManageCondidates;
