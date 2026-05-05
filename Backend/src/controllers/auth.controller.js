import userModel from "../models/user.model.js";
import otpModel from "../models/otp.model.js";
import { generateOTP, generateHTML } from "../utils/email.utils.js";
import sendEmail from "../services/email.service.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import sessionModel from "../models/session.model.js";
import config from "../config/config.js";

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required to register a user.",
    });
  }
  try {
    const userAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (userAlreadyExists) {
      return res.status(400).json({
        message: "User already exists with this username or email.",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      username,
      password: hash,
    });
    const otp = generateOTP();
    console.log(otp);
    const otpHash = crypto
      .createHash("sha256")
      .update(otp.toString())
      .digest("hex");

    await otpModel.create({
      otpHash,
      email,
    });

    const html = generateHTML(otp);

    await sendEmail(
      email,
      "Verification code",
      "enter this code to verify yourself",
      html,
    );

    return res.status(201).json({
      message: "User created successfully!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        verified: user.isVerified,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const verifyCode = async (req, res) => {
  const { otp, email } = req.body;
  if (!otp) {
    return res.status(400).json({
      message: "OTP is required!",
    });
  }
  if (!email) {
    return res.status(400).json({
      message: "email is required!",
    });
  }
  try {
    const otpHash = crypto
      .createHash("sha256")
      .update(otp.toString())
      .digest("hex");
    const otpFound = await otpModel.findOne({
      otpHash,
      email,
    });
    if (!otpFound) {
      return res.status(400).json({
        messsage: "Invalid or expired otp",
      });
    }
    await otpModel.deleteOne(otpFound);
    const user = await userModel.findOne({ email });
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      message: "otp verified successfully",
      user: {
        username: user.username,
        email: user.email,
        verified: user.isVerified,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required to login a user.",
    });
  }
  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(401).json({
        message: "Unauthorized access!",
      });
    }
    const refreshToken = await jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await sessionModel.create({
      refreshTokenHash,
      user: user._id,
      userAgent: req.headers["user-agent"],
      ip:
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress ||
        "127.0.0.1",
    });

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const accessToken = await jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );
    return res.status(200).json({
      message: "User logged in successfully!",
      user: {
        username: user.username,
        email: user.email,
        verified: user.isVerified,
      },
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server error!",
    });
  }
};
export const rotateTokens = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(token)
          .digest("hex");
      
    const session = await sessionModel.findOne({
      revoked: false,
      refreshTokenHash,
    });
    if (!session) {
      return res.status(400).json({
        message: "unauthorized!,not a legit user",
      });
    }


    const accessToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    const hash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    session.refreshTokenHash = hash;
    await session.save();
    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
