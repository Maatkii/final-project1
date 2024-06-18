const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: {},
    required: true,
  },
  durationLimit: {
    type: String,
    required: true,
  },
  skills: {
    type: [],
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  offerSituation: {
    type: String,
    default: "open",
    enum: ["open", "closed"],
  },
  attachement: {
    type: [],
  },
  proposals: [
    {
      freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      description: { type: String, required: true },
      situation: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Accepted", "Refused"],
      },
      price: { type: Number, required: true },
      deliveryTime: {
        number: { type: Number, required: true },
        period: { type: String, required: true },
      },
    },
  ],
});
module.exports = mongoose.model("Offer", offerSchema);
