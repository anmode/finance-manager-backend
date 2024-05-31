const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader, "authHeader");

  if (!authHeader) {
    return res.sendStatus(403);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.error(err);
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
