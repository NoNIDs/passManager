const { Router } = require("express");

const bcrypt = require("bcryptjs");
const config = require("config");

const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const router = Router();

//Register API - api/auth/register

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimal length of password 6 symbols").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg, // first error message in stack
          errors: errors.array(), // to array
        });
      }

      const { email, password } = req.body;

      const tempUser = await User.findOne({ email });

      if (tempUser) {
        return res.status(400).json({ message: "This user already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        config.get("jwtSecret"),
        { expiresIn: "1h" } // the token will exist for 1 hour
      );

      res.status(201).json({ userId: user.id, email: user.email, token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again" });
    }
  }
);

//Login API - api/auth/login

router.post(
  "/login",
  [
    check("email", "Enter correct email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Uncorrect credentials for authorization",
          errors: errors.array(), // to array
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email }); //find fist user

      if (!user) {
        return res.status(400).json({ message: "User don't exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Incorrect password. Please try again" });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get("jwtSecret"),
        { expiresIn: "1h" } // the token will exist for 1 hour
      );

      res.json({ userId: user.id, email: user.email, token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again" });
    }
  }
);

module.exports = router;
