const mongoose = require("mongoose");
var validator = require("validator");

const UserSchema = new mongoose.Schema({
  fullName: {
    required: [true, "Name is Required"],
    type: String,
    validate(value) {
      if (!value.match(/^[a-zA-Z\s]+$/)) {
        throw new Error(
          "Name should not contain numbers or special characters"
        );
      }
    },
  },
  accountNumber: {
    type: Number,
  },
  emailAddress: {
    required: [true, "Email is Required"],
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter a valid E-mail!");
      }
    },
  },
  registrationNumber: {
    type: Number,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
