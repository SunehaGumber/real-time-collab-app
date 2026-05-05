import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'
const authRouter = Router();

/**
 * @params /api/auth/register
 * @description registers a user
 * @access public
 */
authRouter.post('/register', authController.registerController);

/**
 * @params /api/auth/verifyCode
 * @description Marks user verified:true
 * @access public
 */
authRouter.patch('/verifyCode', authController.verifyCode);

/**
 * @params /api/auth/login
 * @description logs in a user
 * @access public
 */
authRouter.post('/login', authController.login);

/**
 * @params /api/auth/refreshToken
 * @description generates new access token and refresh token
 * @access private
 */
authRouter.patch('/refreshToken', authController.rotateTokens)

export default authRouter;
