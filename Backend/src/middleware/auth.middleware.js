import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import userModel from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.headers['authorization'].split(' ')[1];
        if (!accessToken) {
            return res.status(400).json({
                message:"Token not provided!"
            })
        }
        const decoded = jwt.verify(accessToken, config.JWT_SECRET);
    
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                message:'User unauthorized!'
            })
        }

        if (!user.isVerified) {
            return res.status(400).json({
                message:"User isn't verified, Get yourself verified first."
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
