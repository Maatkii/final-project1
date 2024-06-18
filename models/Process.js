const mongoose = require("mongoose");

const processSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    offre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
    },
    projectLink: {
      type: String,
    },
    projectProcess: {
      type: String,
      enum: ["ongoing", "Finished"],
      default: "ongoing",
    },
    price: {
      type: Number,
      required: true,
    },
    deliveryTime: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("process", processSchema);
