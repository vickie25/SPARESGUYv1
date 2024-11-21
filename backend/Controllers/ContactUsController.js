// controllers/messageController.js
import { sendingEmails } from '../Utils/SendEmail.js';
import { asyncHandler } from '../Middleware/asyncHandler.js';
import MessageModel from '../Models/MessageModel.js';

const sendMessage = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, error: 'Please provide all required fields' });
    }

    const currentTimestamp = new Date().toISOString();

    try {
        // Send the email
        const response = await sendingEmails(name, email, subject, message, currentTimestamp);
        console.log('Email sent successfully:', response);

        // Only save to MongoDB if the email was sent successfully
        const newMessage = new MessageModel({
            name,
            email,
            subject,
            message,
            timestamp: currentTimestamp,
        });

       const res1 = await newMessage.save();
       console.log('Message saved to MongoDB:', res1);
        console.log('Message saved to database successfully:', newMessage);

        res.json({ success: true, message: 'Email sent and saved successfully!', data: response });
    } catch (error) {
        console.error('Error:', error);

        // If the email sending fails, we should handle it gracefully
        if (error.message.includes('Email sending failed')) {
            return res.status(500).json({ success: false, error: 'Failed to send email', details: error.message });
        }

        // If saving to the database fails, we can handle that as well
        try {
            // Attempt to save the message even if email sending fails
            const newMessage = new MessageModel({
                name,
                email,
                subject,
                message,
                timestamp: currentTimestamp,
            });
            await newMessage.save();
            console.log('Message saved to database despite email sending failure:', newMessage);
        } catch (dbError) {
            console.error('Failed to save message to database:', dbError);
        }

        res.status(500).json({ success: false, error: 'An error occurred', details: error.message });
    }
});

export {
    sendMessage
};