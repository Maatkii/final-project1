const mongoose = require("mongoose");

const withdrawPaymentSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    d17Number: {
      type: Number,
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

module.exports = mongoose.model("withdraw", withdrawPaymentSchema);
