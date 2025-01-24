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

const User = model('User', userSchema);

export default User;
