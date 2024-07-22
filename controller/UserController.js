import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/UserModel.js";

const hashPassword = (
  password,
  salt = crypto.randomBytes(16).toString("hex")
) => {
  const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");
  return { salt, hash };
};

const verifyPassword = (password, hash, salt) => {
  const newHash = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  return newHash === hash;
};

const signup = async (req, res) => {
  const { first_name, last_name, email, password, gender, phone } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const { salt, hash } = hashPassword(password);
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hash,
      salt,
      gender,
      phone,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 3600000,
    });
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = verifyPassword(password, user.password, user.salt);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      maxAge: 3600000,
    });
    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const signout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production",
  });
  res.json({ success: true, message: "Signout successful" });
};

export { login, signup, signout, hashPassword };
