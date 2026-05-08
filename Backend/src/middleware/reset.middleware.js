import jwt, { decode } from 'jsonwebtoken';
import config from '../config/config.js';
import userModel from '../models/user.model.js';

export const resetMiddleware = async (req, res, next) => {
    try {

        const resetToken = req.headers['authorization'].split(' ')[1];
      
        if (!resetToken) {
            return res.status(400).json({
                message: "Invalid request."
            })
        }
        const decoded = await jwt.verify(resetToken,config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(400).json({
                message:"Unauthorized"
            })
        }

        req.user = user;
        next();
    } catch (err) {

        return res.status(500).json({
            message:"Internal Server error"
        })
    } 
}