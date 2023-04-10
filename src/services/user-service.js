const User = require("../models/UserInfo");

async function generateAccountNumber() {
  const randomNumber = Math.random().toString().slice(2, 11);
  const isExist = await User.findOne({ accountNumber: randomNumber });
  if (isExist) {
    generateAccountNumber();
  }
  return Number(randomNumber);
}

async function generateRegistrationNumber() {
  const date = new Date();
  const randomNumber = date.getTime().toString().slice(2, 7);
  const isExist = await User.findOne({ registrationNumber: randomNumber });
  if (isExist) {
    generateRegistrationNumber();
  }
  return Number(randomNumber);
}

const checkUserEmail = async (email) => {
  const user = await User.findOne({ emailAddress: email });
  if (user) {
    throw new Error("Email already registered");
  }
  return true;
};

const createUserInfo = async (data) => {
  const user = new User({
    fullName: data.fullName,
    emailAddress: data.emailAddress,
    accountNumber: await generateAccountNumber(),
    registrationNumber: await generateRegistrationNumber(),
  });

  await user.save();
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const getUserInfoById = async (id) => {
  const userData = await User.findById(id);
  return userData;
};

const getUserInfoByEmail = async (email) => {
  const userData = await User.findOne({ emailAddress: email });
  return userData;
};

const getUserInfoByAccountNumber = async (accountNumber) => {
  const userData = await User.findOne({ accountNumber: accountNumber });

  if (!userData) {
    throw new Error("User not found");
  }

  return userData;
};

const getUserInfoByRegistrationNumber = async (registrationNumber) => {
  const userData = await User.findOne({
    registrationNumber: registrationNumber,
  });

  if (!userData) {
    throw new Error("User not found");
  }

  return userData;
};

const findAndDeleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  return user;
};

const findAndUpdateUser = async (id, data, options) => {
  const user = await User.findByIdAndUpdate(id, data, options);

  return user;
};

module.exports = {
  checkUserEmail,
  createUserInfo,
  getUserInfoById,
  getUserInfoByAccountNumber,
  getUserInfoByRegistrationNumber,
  generateAccountNumber,
  generateRegistrationNumber,
  getAllUsers,
  getUserInfoByEmail,
  findAndDeleteUser,
  findAndUpdateUser,
};
