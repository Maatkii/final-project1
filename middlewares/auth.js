const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.header("authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied , no token Provided" });
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
module.exports = isAuth;
