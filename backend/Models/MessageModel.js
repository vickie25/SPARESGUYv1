import mongoose from 'mongoose';

// Define the schema for the Message model
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }, 
});

// Create the Message model
const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
