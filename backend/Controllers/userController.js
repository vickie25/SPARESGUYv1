import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import dotenv from "dotenv"


dotenv.config()

//register a user

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({
        email
    });
    if (userExists) {
        res.status(400).json({
            message: "User already exists"
        });
    }
    const user = new User({
        name,
        email,
        password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).json({
        message: "User registered successfully"
    });
}

//login a user

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate a JWT token

        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({ userId: user._id,  }, 'mySuperSecretKey123!', {
            expiresIn: '1h',
        });
        console.log()
        res.json({ token });


    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
//get user profile

