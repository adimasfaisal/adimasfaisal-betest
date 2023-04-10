const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkUsername = async (username) => {
  const user = await Account.findOne({ userName: username });
  if (user) {
    throw new Error("Username already used");
  }
  return true;
};

const createNewAccount = async (data) => {
  const userData = {
    userName: data.userName,
    password: bcrypt.hashSync(data.password, 8),
    userId: data.userId,
  };

  const account = new Account(userData);

  await account.save();
  return account;
};

const signIn = async (userData) => {
  const account = await Account.findOne({ userName: userData.userName });

  if (!account) {
    throw new Error(`User ${userData.userName} does not exist`);
  }

  const comparePassword = await bcrypt.compare(
    userData.password,
    account.password
  );

  if (!comparePassword) {
    throw new Error(`Incorrect Password`);
  }

  const result = jwt.sign(
    {
      userName: userData.userName,
      password: userData.password,
      _id: userData._id,
    },
    process.env.JWT_SECRET_KEY
  );

  const updated = await Account.updateOne(
    { userName: userData.userName },
    { lastLogin: new Date() }
  );

  return {
    accessToken: result,
    userName: userData.userName,
    userId: account.userId,
    lastLogin: await getLastLogin(userData.userName),
  };
};

const getLastLogin = async (userName) => {
  const userData = await Account.findOne({ userName: userName });

  return userData.lastLogin;
};

const loggedUserMoreThanThreeDays = async () => {
  const now = new Date();
  const threeDaysBefore = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  const data = await Account.where({ lastLogin: { $lt: threeDaysBefore } });
  return data;
};

module.exports = {
  checkUsername,
  createNewAccount,
  signIn,
  loggedUserMoreThanThreeDays,
};
