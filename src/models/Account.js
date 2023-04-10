const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  userName: {
    required: [true, "Username is Required"],
    unique: true,
    lowercase: true,
    trim: true,
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  lastLogin: {
    type: Date,
  },
  userId: {
    type: String,
    required: [true, "User Id is Required"],
  },
});

module.exports = Account = mongoose.model("Account", AccountSchema);
