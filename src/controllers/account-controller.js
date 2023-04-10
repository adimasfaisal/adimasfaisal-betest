const userService = require("../services/user-service");
const accountService = require("../services/account-service");
const client = require("../services/redis");

const register = async (req, res, next) => {
  try {
    const data = req.body;
    const checkEmail = await userService.checkUserEmail(data.emailAddress);
    const checkUsername = await accountService.checkUsername(data.username);

    if (checkEmail && checkUsername) {
      const user = await userService.createUserInfo(data);
      data.userId = user._id.toString();
      const newAccount = await accountService.createNewAccount(data);

      res.status(200).send({
        data: {
          userName: newAccount.userName,
          emailAddress: data.emailAddress,
          fullName: data.fullName,
        },
        message: "User created successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  await client.connect();
  try {
    const user = {
      userName: req.body.userName,
      password: req.body.password,
    };

    const signIn = await accountService.signIn(user);
    signIn.user = await userService.getUserInfoById(signIn.userId);

    client.setEx("userInfo", 3600, JSON.stringify(signIn.user));
    await client.quit();

    return res
      .status(200)
      .send({ message: "User signed in successfully", data: signIn });
  } catch (error) {
    next(error);
  }
};

const getLoggedUser = async (req, res, next) => {
  try {
    const accounts = await accountService.loggedUserMoreThanThreeDays();
    res.status(200).send({
      data: accounts,
      message:
        "Successfully get users that last login date time is more than three days ago",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getLoggedUser };
