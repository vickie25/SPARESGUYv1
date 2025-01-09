import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import generateToken from "../Utils/generateToken.js";


dotenv.config()

//register a user
//route: POST /api/users/register
//access: Public

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

//login a user'
//route: POST /api/users/login
//access: Public

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

        // Generate a token and set it in the response's cookies
        generateToken(res, user.email);

        // Return a success message instead of the token
        res.json({ user, message: "Login successful" });


    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Get all users
// route: GET /api/users
// access: Private/Admin

export const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
}


// Get user profile 
// route: GET /api/users/profile
// access: Private

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
}

//update user profile
//route: PUT /api/users/profile
//access: Private

export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}


//delete user
//route: DELETE /api/users/:id
//access: Private/Admin

export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

//get user by id
//route: GET /api/users/:id
//access: Private/Admin

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}
