import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import userModel from '../models/user.model.js';
import crypto from 'crypto';
import sessionModel from '../models/session.model.js';

export const sessionMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
       
        if (!token) {
            return res.status(400).json({
                message:"Token not found!"
            })
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        const refreshTokenHash = crypto.createHash('sha256').update(token).digest('hex');

        const session = await sessionModel.findOne({
            user: decoded.id,
            refreshTokenHash,
            revoked:false
        })
        if (!session) {
            return res.status(400).json({
                message:"Session not found!"
            })
        }
       
        const user = await userModel.findById(decoded.id)

        if (!user) {
            return res.status(401).json({
                message:"Unauthorized!"
            })
        }
        req.session = session;
        req.user = user;
        next();
    } catch (err) {

        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}