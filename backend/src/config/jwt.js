// since the project is not that big , i will define the JWT in here instead of secuirty/jwt.js

const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// TODO: make the jwt system more complex
module.exports = { generateToken, verifyToken };
