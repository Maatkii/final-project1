// Profile.js
import React, { useState } from "react";
import "./steps/Step1.css";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";

function Profile() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    pic: "",
    status: "",
    skills: "",
    experience: "",
    technologies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, pic: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="centered-container">
      {" "}
      {/* Centering container */}
      <div className="multi-step-form-container">
        <div className="multi-step-form">
          {step === 1 && (
            <Step1
              formData={formData}
              handleChange={handleChange}
              handleNext={handleNext}
              handleFileChange={handleFileChange}
            />
          )}
          {step === 2 && (
            <Step2
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
