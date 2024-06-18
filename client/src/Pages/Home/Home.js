import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import video from "../../../src/Assets/images/home.mp4";
const Home = () => {
  return (
    <div>
      <section className="banner">
        <video src={video} autoPlay loop muted></video>
        <div className="content">
          <h1>Welcome to Our Platform</h1>
          <p>A platform connecting freelancers and clients.</p>
        </div>
      </section>
      <section className="features">
        <div className="container">
          <div className="feature">
            <h2>For Freelancers</h2>
            <p>Find projects, showcase your skills, and get hired.</p>
          </div>
          <div className="feature">
            <h2>For Clients</h2>
            <p>Hire talented freelancers for your projects.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Post a Project</h3>
              <p>Describe your project and requirements.</p>
            </div>
            <div className="step">
              <h3>2. Find Freelancers</h3>
              <p>Browse profiles or get matched with suitable freelancers.</p>
            </div>
            <div className="step">
              <h3>3. Hire Freelancers</h3>
              <p>Hire the best freelancer for your project.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <Link to="/register">
            <button>Join Now</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
