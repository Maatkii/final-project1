// Step1.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import "./Step1.css"; // Import the CSS file for styling

function Step1({
  formData,
  handleChange,
  handleNext,
  handleFileChange,
  currentStep,
}) {
  const isActive = currentStep === 1;

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  return (
    <div className={`step ${isActive ? "active-step" : ""}`}>
      <h2 className="step-heading">Step 1: Your Info</h2>
      <div className="image-upload">
        <label htmlFor="profile-pic" className="image-upload-label">
          {formData.pic ? (
            <img src={formData.pic} alt="Profile" className="profile-pic" />
          ) : (
            <React.Fragment>
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                className="upload-icon"
              />
              <span className="" style={{ color: "white" }}>
                Upload Profile Picture
              </span>
            </React.Fragment>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          id="profile-pic"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
      </div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="form-input"
      />
      <input
        type="text"
        name="status"
        value={formData.status}
        onChange={handleChange}
        placeholder="Status"
        className="form-input"
      />
      <button onClick={handleNext} className="next-button">
        Next
      </button>
    </div>
  );
}

export default Step1;
