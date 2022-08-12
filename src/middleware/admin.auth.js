const jwt = require("jsonwebtoken");
const Admin = require("../models/admins");
const { JWT_SECRET } = require("../helpers/secrets");
const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").slice(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!admin) {
      throw new Error();
    }
    req.token = token;
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = adminAuth;
