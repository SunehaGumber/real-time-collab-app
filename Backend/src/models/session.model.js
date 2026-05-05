import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    refreshTokenHash: {
        type: String,
        required:[true,"refresh token hash is required!"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"user is required"]
    },
    ip: {
        type: String,
        required: true
    },
    userAgent: {
        type: String, // Stores browser and OS info
        required: true
    },
    revoked: {
        type: Boolean,
        required: [true, "revoked field is required!"],
        default:false
    },

}, {
    timestamps:true
})

const sessionModel = mongoose.model('session', sessionSchema);

export default sessionModel;