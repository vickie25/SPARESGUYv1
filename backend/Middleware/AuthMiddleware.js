import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    const key = "mySuperSecretKey123!";
    console.log(key, "This isthe key")

    try {
        const decoded = jwt.verify(token, key);
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid token." });
    }
};