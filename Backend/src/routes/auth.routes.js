import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'
import { sessionMiddleware } from "../middleware/session.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { resetMiddleware } from "../middleware/reset.middleware.js";
import { registerSchema, loginSchema } from "../validations/register.validation.js";
import { verifyOTPSchema, emailSchema } from "../validations/otp.validation.js";
import { updatePassSchema, changePassSchema } from "../validations/password.validation.js";
import { validate } from "../middleware/validation.middleware.js";
import { globalLimiter, authLimiter } from "../middleware/ratelimiter.middleware.js";

const authRouter = Router();

/**
 * @route /api/auth/register
 * @description registers a user
 * @access public
 */
authRouter.post('/register', authLimiter,validate(registerSchema),authController.registerController);

/**
 * @route /api/auth/verifyCode
 * @description Marks user verified:true
 * @access public
 */
authRouter.patch('/verifyCode', authLimiter,validate(verifyOTPSchema),authController.verifyCode);

/**
 * @route /api/auth/login
 * @description logs in a user
 * @access public
 */
authRouter.post('/login',authLimiter,validate(loginSchema), authController.login);

/**
 * @route /api/auth/refreshToken
 * @description generates new access token and refresh token
 * @access private
 */
authRouter.patch('/refreshToken', authController.rotateTokens);

/**
 * @route /api/auth/logout
 * @description logs out the user
 * @access private
 */
authRouter.patch('/logout',sessionMiddleware, authController.logout);

/**
 * @route /api/auth/logoutAll
 * @description logs out user from all devices
 * @access private
 */
authRouter.patch('/logoutAll', sessionMiddleware, authController.logoutAll);

/**
 * @route /api/auth/resendOTP
 * @description resends an otp on user's device
 * @access public
 */
authRouter.post('/resendOtp',authLimiter, validate(emailSchema),authController.resendOTP);

/**
 * @route /api/auth/changePassword
 * @description Changes password of a user
 * @access private
 */
authRouter.patch('/updatePassword',authMiddleware, validate(updatePassSchema), authController.updatePassword);

/**
 * @route /api/auth/get-me
 * @description Gets a user
 * @access private
 */
authRouter.get('/get-me', authMiddleware, authController.getMe);

/**
 * @route /api/auth/forgotPassword
 * @description user don't remember password and here otp is sent 
 * @access public
 */
authRouter.post('/forgotPassword',authLimiter,validate(emailSchema), authController.forgotPassword);

/**
 * @route /api/auth/verifyPassCode
 * @description verify pass code and generates a reset token
 */
authRouter.post('/verifyPassCode',authLimiter, validate(verifyOTPSchema),authController.verifyPassCode);

/**
 * @route /api/auth/changePassword
 * @description changes password if reset token is present.
 * @access private
 */
authRouter.patch('/changePassword',authLimiter,validate(changePassSchema), resetMiddleware, authController.changePassword);

/**
 * @route /api/auth/resendPasswordOTP
 * @description resends the otp that lets us change password.
 * @access public
 */
authRouter.post('/resendPasswordOTP',authLimiter,validate(emailSchema), authController.resendPasswordOTP);

export default authRouter;
