const mongoose = require("mongoose");

let image =
  "https://www.vasterad.com/themes/hireo_21/images/user-avatar-placeholder.png";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: function () {
      return this.role !== "admin";
    },
  },
  avatar: {
    type: String,
    default: image,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  balance: {
    type: Number,
    default: 0,
    required: function () {
      return this.role == "client" || this.role == "freelancer";
    },
  },
  role: {
    type: String,
    enum: ["admin", "client", "freelancer"], // Exemple de valeurs de rôle
  },
});

module.exports = mongoose.model("User", userSchema);
