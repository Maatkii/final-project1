const mongoose = require("mongoose");
const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tagLine: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },

  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
    },
  ],
  skills: [
    {
      name: { type: String, required: true },
    },
  ],
  projects: [
    {
      projectName: { type: String, required: true },
      projectLink: { type: String, required: true },
    },
  ],
  socialMediaLinks: [
    {
      name: { type: String, default: "github" },
      link: { type: String, default: "" },
    },
    {
      name: { type: String, default: "behance" },
      link: { type: String, default: "" },
    },
    {
      name: { type: String, default: "dribbble" },
      link: { type: String, default: "" },
    },
  ],
});
module.exports = mongoose.model("Portfolio", portfolioSchema);
