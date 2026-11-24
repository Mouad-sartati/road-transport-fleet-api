import { userService } from "../services/userService.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class AuthController {
  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("SIGNUP REQUEST RECEIVED");
      console.log("CONTROLLER BODY:", req.body);
console.log("CONTROLLER DATA:", req.body?.data);
      const user = await userService.createUser(req.body);

      res.status(201).json({
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      //   console.error(error);
      if (error instanceof Error) {
        res.status(500).json({
          message: "Error creating user",
          error: error.message,
        });
      }
    }
  };
  Login = async (req: Request, res: Response): Promise<void> => {
    const {data} = req.body
    const user = await userService.getUserByEmail(data.email);
    
    if (user==null) {
      console.log(user)
      res.status(401).json({
        status: 401,
        message: "the email are not correct",
      });
      return;
    }
    const IsPasswordvelid = await bcrypt.compare(
      data.password,
      user.password,
    );
    if (!IsPasswordvelid) {
      res.status(401).json({
        status: 401,
        message: "password incorrect",
      });
      return;
    }
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    res.status(200).json({
      status: 200,
      message: "Login successful",
      token,
    });
  };
}
export const authController = new AuthController();
