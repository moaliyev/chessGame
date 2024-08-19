// Modules
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "./../utils/generateToken";

// Models
import User from "./../models/user.model";
import { Request, Response } from "express";

export class AuthController {
  public static signUpController = async (req: Request, res: Response) => {
    try {
      const { userName, password, confirmPassword } = req.body;
      if (!userName) {
        return res.status(400).json({
          error: "Username is required",
        });
      }

      // Check passwords
      if (password !== confirmPassword) {
        return res.status(400).json({
          error: "Passwords do not match",
        });
      }

      // Check username duplicate
      const user = await User.findOne({ userName });
      if (user)
        return res.status(400).json({
          error: `Username ${userName} is taken`,
        });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Creating the user
      const newUser = new User({
        userName,
        password: hashedPassword,
      });

      if (newUser) {
        // Generate JWT token
        generateTokenAndSetCookie(newUser._id.toString(), res);
        await newUser.save();

        // User created successfully
        res.status(201);
      } else {
        res.status(400).json({ error: "Invalid user data" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };

  public static loginController = async (req: Request, res: Response) => {
    try {
      const { userName, password } = req.body;
      const user = await User.findOne({ userName });

      const isPasswordCorrect = await bcrypt.compare(
        password,
        user?.password || ""
      );

      if (!user || !isPasswordCorrect)
        return res.status(400).json({ error: "Invalid credentials" });

      generateTokenAndSetCookie(user._id.toString(), res);

      res.status(200).json({
        _id: user._id,
        userName: user.userName,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };

  public static logoutController = (req: Request, res: Response) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };
}
