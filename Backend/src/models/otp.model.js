import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otpHash: {
        type: String,
        required:[true,"otp hash is required!"]
    },
    email: {
        type: String,
        required:[true,"email is required"] 
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires:300
    }
}, {
    timestamps:true
})

const otpModel = mongoose.model('otp', otpSchema);

export default otpModel;
