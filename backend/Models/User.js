
//a model for user registration and login

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: false, 
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,

        required: false, 
    },
    role: {
        type: String,
        enum: ['customer', 'admin'], 
        default: 'customer', 
    },
    googleId: {
        type: String, 
        unique: true,
        sparse: true, 
    },
    picture: {
        type: String, 
    },
}, { timestamps: true });

        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'], // Define roles: customer or admin
        default: 'admin'     // Default role is customer
    }

});


const User = model('User', userSchema);

export default User;
