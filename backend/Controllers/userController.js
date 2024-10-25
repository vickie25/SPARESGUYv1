import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import generateToken from "../Utils/generateToken.js";


dotenv.config()

//register a user

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const role = "customer"; // Default role is 'customer'
        
        console.log("This is the name:", name);
        console.log("This is the role:", role);

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create a new user
        const user = new User({
            name,
            email,
            password,
            role // Assign role or default to 'customer'
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        generateToken(res, email)
        console.log("Tkn created!")
        // Send success response
        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({
            message: "Server error" // Generic error message for the client
        });
    }

    
};

//login a user

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("This is the email:", email);
        console.log("This is the password:", password);
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

        // console.log("JWT_SECRET:", process.env.JWT_SECRET);
        // const token = jwt.sign({ userId: user._id,  }, 'mySuperSecretKey123!', {
        //     expiresIn: '1h',
        // });
        // console.log()
        // res.json({ token });

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            'mySuperSecretKey123!',
            { expiresIn: '1h' }
        )

        res.json({ token });


    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};



