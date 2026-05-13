import userModel from "../models/user.model.js";
import otpModel from "../models/otp.model.js";
import { generateOTP, generateHTML, generateHTMLForPassUpdation } from "../utils/email.utils.js";
import sendEmail from "../services/email.service.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import sessionModel from "../models/session.model.js";
import config from "../config/config.js";

export const registerController = async (req, res,next) => {
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

    const otpHash = crypto
      .createHash("sha256")
      .update(otp.toString())
      .digest("hex");

    const otpStored=await otpModel.create({
      otpHash,
      email,
    });
    console.log(otpStored);

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
    next(err);
  }
};

export const verifyCode = async (req, res,next) => {
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
    next(err);
  }
};

export const login = async (req, res,next) => {
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
    next(err);
  }
};

export const rotateTokens = async (req, res,next) => {
  try {
    const session = req.session;
    const user = req.user;

    const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
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
    next(err);
  }
};

export const logout = async (req, res,next) => {
  try {
    const session = req.session;

    session.revoked = true;
    await session.save();

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const logoutAll = async (req, res,next) => {
  try {
    const user = req.user;

    await sessionModel.updateMany(
      {
        user: user._id,
        revoked: false,
      },
      {
        revoked: true,
      },
    );
    res.clearCookie("token");
    return res.status(200).json({
      message: "User logged out from all devices!",
    });
  } catch (err) {
    next(err);
  }
};

export const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }
    const otps = await otpModel.deleteMany({
      email,
    });
    const otp = generateOTP();

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
      "Enter this code to verify yourself",
      html,
    );
    return res.status(201).json({
      message: "Code sent successfully!",
    });
  }
  catch (err) {
    next(err);
  }
};

export const updatePassword = async (req, res,next) => {
  try {
    const user = req.user;
    const { email, oldPassword, newPassword } = req.body;
    const userWithPassword = await userModel
      .findById(user._id)
      .select("+password");
    console.log(userWithPassword);
    const matches = await bcrypt.compare(oldPassword, userWithPassword.password);

    if (!matches) {
      return res.status(401).json({
        message:"Incorrect Password!"
      })
    }

    const hash =await bcrypt.hash(newPassword, 10);

    userWithPassword.password = hash;
    await userWithPassword.save();
  
    return res.status(200).json({
      message: "Password updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res,next) => {
  try {
    const user = req.user;
    return res.status(200).json({
      message: "User returned successfully!",
      user
    })
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res,next) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message:"unauthorized"
      })
    }
    const otp = generateOTP();

    const otpHash = crypto.createHash('sha256').update(otp.toString()).digest('hex');

    await otpModel.create({
      otpHash, email
    })

    const html = generateHTMLForPassUpdation(otp);

    await sendEmail(email, 'Password updation code', 'code for updating password', html);

    return res.status(201).json({
      message: "Password verification code sent successfully!"
    })
  } catch (err) {
    next(err);
  }
};

export const verifyPassCode = async (req, res,next) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(400).json({
        message: "Bad request, please give email and otp!"
      })
    }
    const otpHash = crypto.createHash('sha256').update(otp.toString()).digest('hex');
    const user = await userModel.findOne({ email });
    const modelOtp = await otpModel.findOne({
      email, otpHash
    })
    if (!modelOtp) {
      return res.status(401).json({
        message: "Unauthorized user!"
      })
    }
    await otpModel.deleteById({
      _id: modelOtp._id
    })
    const resetToken = await jwt.sign({
      id: user._id
    }, config.JWT_SECRET, {
      expiresIn: "15m"
    })
    return res.status(200).json({
      message: "code verified successfully!", resetToken
    })
  }
  catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res,next) => {
  try {
    const us = req.user;
    const user = await userModel.findById(us._id);

    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords must match"
      })
    }
    const hash = await bcrypt.hash(newPassword, 10);
   
    user.password = hash;
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully!"
    })
    
  } catch (err) {
    next(err);
  }
};

export const resendPasswordOTP = async (req, res,next) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user Unauthenticated"
      });
    }
    await otpModel.deleteMany({ email });
    const otp = generateOTP();
    const otpHash = crypto.createHash('sha256').update(otp.toString()).digest('hex');

    const otps = await otpModel.create({
      otpHash,email
    })
    const html = generateHTMLForPassUpdation(otp);

    await sendEmail(email, 'Password updation code', 'code for verifying yourself', html);

    return res.status(201).json({
      message:"Password updation code sent successfully!"
    })
  } catch (err) {
    next(err);
  }
};