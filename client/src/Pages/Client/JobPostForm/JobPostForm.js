import React, { useState } from "react";
import "./JobPostForm.css";

function JobPostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [period, setPeriod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, budget, period });
    setTitle("");
    setDescription("");
    setBudget("");
    setPeriod("");
  };

  return (
    <div className="job-post">
      <h2>Post a Job Offer</h2>
      <form className="job-post-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Project name:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="budget">Budget:</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="period">Period:</label>
          <input
            id="period"
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JobPostForm;
