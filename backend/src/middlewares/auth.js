const { verifyToken } = require("../config/jwt");
const { User } = require("../models/Index.js");

const auth = async (req, res, next) => {
  try {
    // get the token from the headers
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // no toekn -> raise an error
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    // now we know that theres a token -> verify it
    const decoded = verifyToken(token);
    // this is acctually not the best practice, but it works for now
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    req.user = user;
    // next function which literally goes to the next thing
    next();
  } catch (error) {
    res.status(401).json({ error: `Invalid token. ${error.message}` });
  }
};

module.exports = auth;
