const userService = require("../services/user-service");
const client = require("../services/redis");

const getAllUsers = async (req, res, next) => {
  try {
    const data = await userService.getAllUsers();

    res.send({
      data: data,
      message: "Success Get User",
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserInfoById(id);

    res.send({
      data: user,
      message: "Success Get User",
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const checkUser = await userService.getUserInfoByEmail(req.body.emailAddress);

  if (checkUser) {
    return res.status(500).send({
      message: "User with this email address is already exists",
    });
  }

  try {
    const user = {
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
    };

    const data = await userService.createUserInfo(user);

    res.status(200).send({ data: data, message: "Successfully created user" });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const newData = req.body;
    const options = { new: true };

    const updatedData = await userService.findAndUpdateUser(
      id,
      newData,
      options
    );

    res.status(200).send({
      data: updatedData,
      message: "Successfully updated user",
    });
  } catch (error) {
    next(error);
  }
};

const checkLoggedUser = async (req, res, next) => {
  try {
    await client.connect();
    const loggedUser = await client.get("userInfo");
    await client.quit();
    if (loggedUser) {
      res.status(200).send({ data: loggedUser });
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userService.findAndDeleteUser(id);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getUserByAccountNumber = async (req, res, next) => {
  try {
    const user = await userService.getUserInfoByAccountNumber(
      req.params.accountNumber
    );

    res.status(200).send({
      data: user,
      message: "Successfully retrieved user by account number",
    });
  } catch (error) {
    next(error);
  }
};

const getUserByRegistrationNumber = async (req, res, next) => {
  try {
    const user = await userService.getUserInfoByRegistrationNumber(
      req.params.registrationNumber
    );

    res.status(200).send({
      data: user,
      message: "Successfully retrieved user by registration number",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByAccountNumber,
  getUserByRegistrationNumber,
  checkLoggedUser,
};
