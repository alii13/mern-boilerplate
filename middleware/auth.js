const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var CustomError = require("../error/customError");
require("dotenv").config();
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return res.status(401).json('You need to Login first ✋')
    }
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decrypt.id,
    };
    next();
  } catch (err) {
    let error = new CustomError(err.toString(), 500);
    return res.status(500).send(error);
  }
};
module.exports = verifyToken;