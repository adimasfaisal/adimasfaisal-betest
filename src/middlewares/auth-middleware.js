const accessTokenSecret = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Token is invalid" });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).send({ message: "Token Not Found" });
  }
};

module.exports = authenticateJWT;
