import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchChats } from "../../../redux/actions/chatActions";
import { calculateTimeSince } from "../../../utils";
import {
  Make_notification_readed,
  notifications,
} from "../../../redux/actions/Actions";
import Logo from "../../../Assets/images/logo-navbar.png";
import "./style.css";

const Header = () => {
  const [notificationActive, setNotificationActive] = useState(false);
  const [messages, setMessages] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [navigation, setNavigation] = useState([
    {
      Name: "Home",
      Path: "/",
      user: "",
    },
    {
      Name: "Find Tasks",
      Path: "/task-list",
      user: "",
    },
    {
      Name: "Manage Tasks",
      Path: "/manage-tasks",
      user: "client",
    },
    {
      Name: "Post Task",
      Path: "/post-task",
      user: "client",
    },
    {
      Name: "Active Task",
      Path: "/manage-active-tasks",
      user: "client",
    },
    {
      Name: "Freelancers",
      Path: "/freelancer-list",
      user: "client",
    },
    {
      Name: "Reclamation",
      Path: "/add-reclamation",
      user: "client",
    },

    {
      Name: "My Active Proposal",
      Path: "/freelancer-active-proposal",
      user: "freelancer",
    },
    {
      Name: "Withdraw",
      Path: "/withdraw-request",
      user: "freelancer",
    },
    {
      Name: "Reclamation",
      Path: "/add-reclamation",
      user: "freelancer",
    },
    {
      Name: "Freelancers",
      Path: "/admin/freelancer-list",
      user: "admin",
    },
    {
      Name: "Clients",
      Path: "/admin/client-list",
      user: "admin",
    },
    {
      Name: "Process",
      Path: "/admin/process-list",
      user: "admin",
    },
    {
      Name: "Reclamations",
      Path: "/admin/reclamations-list",
      user: "admin",
    },
    {
      Name: "Payment Approval",
      Path: "/admin/payment-approval",
      user: "admin",
    },
    {
      Name: "Withdraw Approval",
      Path: "/admin/withdraw-list",
      user: "admin",
    },
  ]);
  const { chats } = useSelector((state) => state.ChatReducer);
  const { user, isAuth, notification } = useSelector(
    (state) => state.LoginReducer
  );
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(notifications());
      dispatch(fetchChats());
    }
  }, [isAuth]);

  return (
    <header id="header-container" className="fullwidth">
      {/* Header */}
      <div id="header">
        <div className="container">
          {/* Left Side Content */}
          <div className="left-side">
            {/* Logo */}
            <div id="logo">
              <a href="#">
                <img src={Logo} alt="" />
              </a>
            </div>
            {/* Main Navigation */}
            <nav id="navigation">
              <ul id="responsive">
                {navigation.map((nav, index) => {
                  return user.role == nav.user ? (
                    <li key={index}>
                      <Link
                        to={nav.Path}
                        className={
                          nav.Path === location.pathname ? "current" : ""
                        }
                      >
                        {nav.Name}
                      </Link>
                    </li>
                  ) : nav.user == "" ? (
                    <li key={index}>
                      <Link
                        to={nav.Path}
                        className={
                          nav.Path === location.pathname ? "current" : ""
                        }
                      >
                        {nav.Name}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </nav>
            <div className="clearfix" />
            {/* Main Navigation / End */}
          </div>
          {/* Left Side Content / End */}
          {/* Right Side Content / End */}
          <div className="right-side">
            {/*  User Notifications */}
            {isAuth ? (
              <>
                <div className="header-widget hide-on-mobile">
                  {/* Notifications */}
                  <div
                    className={`header-notifications ${
                      notificationActive ? "active" : ""
                    }`}
                  >
                    {/* Trigger */}
                    <div
                      className="header-notifications-trigger"
                      onClick={() => {
                        setMessages(false);
                        setNotificationActive(!notificationActive);
                        setUserDropdown(false);
                      }}
                    >
                      <a href="#">
                        <i className="fa-regular fa-bell" />
                        <span>
                          {notification.filter((notif) => !notif.Readed).length}
                        </span>
                      </a>
                    </div>
                    {/* Dropdown */}
                    <div className="header-notifications-dropdown">
                      <div className="header-notifications-headline">
                        <h4>Notifications</h4>
                        <button
                          className="mark-as-read ripple-effect-dark"
                          onClick={() => dispatch(Make_notification_readed())}
                        >
                          <i className="fa-regular fa-check-to-slot" />
                        </button>
                      </div>
                      <div className="header-notifications-content">
                        <div className="header-notifications-scroll">
                          <ul>
                            {notification
                              .slice()
                              .reverse()
                              .map((notif, index) => {
                                return (
                                  <li className={`notifications-not-read `}>
                                    <Link to={notif.path}>
                                      <span className="notification-icon">
                                        <i className="fa-regular fa-circle-exclamation"></i>
                                      </span>
                                      <span className="notification-text">
                                        <strong
                                          style={
                                            notif.Readed
                                              ? {}
                                              : { fontWeight: 900 }
                                          }
                                        >
                                          {notif.description}
                                        </strong>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div
                    className={`header-notifications ${
                      messages ? "active" : ""
                    }`}
                  >
                    <div
                      className="header-notifications-trigger"
                      onClick={() => {
                        setNotificationActive(false);
                        setMessages(!messages);
                        setUserDropdown(false);
                      }}
                    >
                      <a href="#">
                        <i className="fa-regular fa-messages" />
                        <span>0</span>
                      </a>
                    </div>
                    {/* Dropdown */}
                    <div className="header-notifications-dropdown">
                      <div className="header-notifications-headline">
                        <h4>Messages</h4>
                        <button className="mark-as-read ripple-effect-dark">
                          <i className="icon-feather-check-square" />
                        </button>
                      </div>
                      <div className="header-notifications-content">
                        <div className="header-notifications-scroll">
                          <ul>
                            {chats?.map((chat, index) => {
                              const Chatusers = chat.users.find(
                                (chatUser) => chatUser._id !== user._id
                              );
                              return (
                                <li
                                  className="notifications-not-read"
                                  key={index}
                                >
                                  <Link to="/messages">
                                    <span className="notification-avatar status-online">
                                      <img src={Chatusers?.avatar} alt="" />
                                    </span>
                                    <div className="notification-text d-flex flex-column">
                                      <strong>{`${Chatusers?.firstName} ${Chatusers?.lastName}`}</strong>
                                      <p className="notification-msg-text">
                                        {chat?.latestMessage?.message}
                                      </p>
                                      <span className="color">
                                        {calculateTimeSince(
                                          chat?.latestMessage?.createdAt
                                        )}
                                      </span>
                                    </div>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <Link
                        to="/messages"
                        className="header-notifications-button ripple-effect button-sliding-icon"
                      >
                        View All Messages
                        <i className="fa-regular fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                {/*  User Notifications / End */}
                {/* User Menu */}
                <div className="header-widget">
                  {/* Messages */}
                  <div
                    className={`header-notifications user-menu ${
                      userDropdown ? "active" : ""
                    }`}
                  >
                    <div
                      className="header-notifications-trigger"
                      onClick={() => {
                        setMessages(false);
                        setNotificationActive(false);
                        setUserDropdown(!userDropdown);
                      }}
                    >
                      <a href="#">
                        <div className="user-avatar status-online">
                          <img src={user?.avatar} alt="" />
                        </div>
                      </a>
                    </div>
                    {/* Dropdown */}
                    <div className="header-notifications-dropdown ">
                      {/* User Status */}
                      <div className="user-status">
                        {/* User Name / Avatar */}
                        <div className="user-details">
                          <div className="user-avatar status-online">
                            <img src={user?.avatar} alt="" />
                          </div>
                          <div className="user-name">
                            {user?.firstName} {user?.lastName}{" "}
                            <span>{user?.role}</span>
                            {user?.role !== "admin" ? (
                              <span>Balance : ${user?.balance}</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <ul className="user-menu-small-nav  ">
                        {user?.role === "client" ? (
                          <li>
                            <Link to="/deposit-money">
                              <i className="fa-duotone fa-dollar" /> Deposit
                            </Link>
                          </li>
                        ) : null}
                        {user?.role !== "admin" ? (
                          <li>
                            <Link
                              to={
                                user.role === "client"
                                  ? "/client-settings"
                                  : user.role === "freelancer"
                                  ? "/freelancer-settings"
                                  : "/"
                              }
                            >
                              <i className="fa-duotone fa-gear" /> Settings
                            </Link>
                          </li>
                        ) : null}

                        <li
                          onClick={() => {
                            localStorage.removeItem("accessToken");
                            window.location.reload();
                          }}
                        >
                          <Link to="#">
                            <i className="fa-duotone fa-power-off" /> Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* User Menu / End */}
                {/* Mobile Navigation Button */}
                <span className="mmenu-trigger">
                  <button
                    className="hamburger hamburger--collapse"
                    type="button"
                  >
                    <span className="hamburger-box">
                      <span className="hamburger-inner" />
                    </span>
                  </button>
                </span>
              </>
            ) : (
              <>
                <ul className="user-menu-small-nav d-flex">
                  <li className="margin-right-20">
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </>
            )}
          </div>
          {/* Right Side Content / End */}
        </div>
      </div>
      {/* Header / End */}
    </header>
  );
};

export default Header;
