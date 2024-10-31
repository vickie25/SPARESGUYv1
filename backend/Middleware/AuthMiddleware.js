import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import User from "../Models/User.js";

dotenv.config()

const authMiddleware = async(req, res, next) => {
    const token = req.cookies.token;
    console.log(token, "This is the token")

    const key = "mySuperSecretKey123!";
    console.log(key, "This isthe key")

    try {
        const email = jwt.verify(token, key);
        console.log(email, "This is the email")
        const user = await User.findOne({ email: email.id });
        console.log(user, "This is the user")
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid token." });
    }
};

export default authMiddleware;

