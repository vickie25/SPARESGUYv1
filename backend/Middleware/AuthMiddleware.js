import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token, "This is the token")

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

export default authMiddleware;

