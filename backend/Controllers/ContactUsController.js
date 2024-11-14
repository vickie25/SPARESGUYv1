import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

 // data validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or any other email provider
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Define the email options
    const mailOptions = {
      from: email,
      to: process.env.RECIPIENT_EMAIL,
      subject: `${subject} - From ${name}`,
      text: message,
  
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
};