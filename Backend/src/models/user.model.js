import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required."],
        unique:[true,"username should be unique."]
    },
    email: {
        type: String,
        required: [true, "email is required!"],
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        min: [6, "password must be of atleast 6 characters"],
        required: [true, "password is required"],
        select:false
    },
    isVerified: {
        type: Boolean,
        default: false,
        required:[true,"is verified is to be specified"]
    }
});

const userModel = mongoose.model('user', userSchema);

export default userModel;