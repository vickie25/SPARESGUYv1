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
    const user = await User.findOne({
        email
    }); 
    if (!user) {
        res.status(400).json({
            message: "Invalid email or password"
        });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);
    res.status(200).json({
        token
    });
}
//get user profile

