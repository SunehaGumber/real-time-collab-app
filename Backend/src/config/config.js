import dotenv from 'dotenv';
dotenv.config();
if (!process.env.MONGO_URI) {
    console.log("MONGO_URI is missing in env.")
}
if (!process.env.PORT) {
    console.log("PORT is missing in env")
}
if (!process.env.EMAIL_USER) {
    console.log('EMAIL_USER is missing in env')
}
if (!process.env.REFRESH_TOKEN) {
    console.log('REFRESH_TOKEN is missing in env')
}
if (!process.env.CLIENT_ID) {
    console.log('CLIENT_ID is missing in env')
}
if (!process.env.CLIENT_SECRET) {
    console.log('CLIENT_SECRET is missing in env');
}
if (!process.env.JWT_SECRET) {
    console.log('JWT_SECRET is missing in env');
}

const config = {
    MONGO_URI:process.env.MONGO_URI,
    PORT: process.env.PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    JWT_SECRET:process.env.JWT_SECRET
}

export default config;