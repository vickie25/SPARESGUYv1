const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Mock login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Example: Mock authentication logic
  if (email === 'user@example.com' && password === 'password123') {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Send email notification after successful login
app.post('/api/send-login-email', (req, res) => {
  const { email } = req.body;

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or your preferred email service
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password', // Use app-specific passwords for Gmail
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Login Notification',
    text: `Hello, you've successfully logged in to your account.`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
