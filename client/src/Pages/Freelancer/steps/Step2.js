// Step2.js
import React from "react";
import "./Step1.css"; // Reuse styles from Step1

function Step2({ formData, handleChange, handleSubmit, handleBack }) {
  return (
    <div className="step active-step">
      <h2 className="step-heading">Step 2: Additional Info</h2>
      <input
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        placeholder="Skills"
        className="form-input"
      />
      <input
        type="text"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        placeholder="Experience"
        className="form-input"
      />
      <input
        type="text"
        name="technologies"
        value={formData.technologies}
        onChange={handleChange}
        placeholder="Technologies"
        className="form-input"
      />
      <button onClick={handleBack} className="next-button">
        Back
      </button>
      <button onClick={handleSubmit} className="next-button">
        Submit
      </button>
    </div>
  );
}

export default Step2;
