import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Pick which collection to query
    const Model = role === "admin" ? Admin : User;

    const existing = await Model.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Model({ fullName, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Pick which collection to query
    const Model = role === "admin" ? Admin : User;

    console.log("Login attempt:", email, role);

    const user = await Model.findOne({ email });
    console.log("Found user:", user ? user.email : "none");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials (user not found)" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Password mismatch");
      console.log("Entered password:", password);
      console.log("Stored hash:", user.password);
      return res.status(400).json({ message: "Invalid credentials (password mismatch)" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Change password (works for both user & admin)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword, role } = req.body;

    // Pick which collection to query
    const Model = role === "admin" ? Admin : User;

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `${role} not found` });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: `${role} password updated successfully` });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
