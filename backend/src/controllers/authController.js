// i usually use the word "crud" like "auth_crud" but it looks like its common in express to call it controllers

const { User } = require("../models/Index.js");
const { generateToken } = require("../config/jwt");

const register = async (req, res) => {
  try {
    // for now i wont use custom schemas for each request like fastapi pandantic schemas, just to save time
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // create user and the jwt token
    const user = await User.create({ name, email, password });
    const token = generateToken({ id: user.id });

    // usually i use custom schema also for the response, but for now i will just return the user object
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = generateToken({ id: user.id }); // pass the user id to the token, looking at the simplicity of the project, this should be enough

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
