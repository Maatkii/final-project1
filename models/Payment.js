const mongoose = require("mongoose");

const depositPaymentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    d17Number: {
      type: Number,
    },
    paymentMessage: {
      type: String,
    },
    paymentProcess: {
      type: String,
      enum: ["ongoing", "Finished"],
      default: "ongoing",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("payment", depositPaymentSchema);
