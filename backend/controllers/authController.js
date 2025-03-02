import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from "../models/User.js";

// export const registerUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ email, password: hashedPassword });

//     await user.save();
//     res.status(201).json({ msg: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };


export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        // Check if all fields are provided
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "Full name, email, and password are required",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true, // ✅ Add this field
            message: "User registered successfully",
            user: { fullname, email },
          });
      

    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    // ✅ Set HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

 
export const logout = (req, res) => {
  try {
    res.clearCookie("token"); // Remove authentication token (if stored in cookies)
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
};