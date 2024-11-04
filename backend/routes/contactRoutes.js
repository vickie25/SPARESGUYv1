// backend/routes/contactRoutes.js
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Your email address
            pass: 'your-email-password', // Your email password
        },
    });

    // Set up email data
    let mailOptions = {
        from: email, // Sender address
        to: 'lynnakinyi2003@gmail.com', // List of receivers
        subject: subject, // Subject line
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // Plain text body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Log the error
            return res.status(500).json({ message: 'Error sending email', error });
        }
        res.status(200).json({ message: 'Email sent successfully', info });
    });
});

export default router;
