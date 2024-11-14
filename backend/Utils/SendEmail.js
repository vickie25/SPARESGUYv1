import nodemailer from 'nodemailer';

export const sendingEmails = async (Email, message, Names, currentTimestamp) => {
    try {
        const authEMAIL = process.env.EMAIL_USER;
        const PASSWORD = process.env.EMAIL_PASS;
    
        console.log(PASSWORD, "Password")
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: authEMAIL,
                pass: PASSWORD
            }
        });

        const mailOptions = {
            from: Email,
            to: 'apbcafricait@gmail.com',
            subject: 'You are receiving this message from your online client',
            html: `
                <div style="background-color: #f4f4f4; padding: 20px 0;">
                    <div style="background-color: #182366; color: white; text-align: center; padding: 10px 0;">
                        <h2>New message from Your Website</h2>
                    </div>
                    <div style="background-color: white; padding: 20px; margin: 20px;">
                        <p>You have a new message from ${Names}.</p>
                        <p>Email: ${Email}</p>
                        <p>Message:</p>
                        <p>${message}</p>
                        <p>Sent On: ${currentTimestamp}</p>
                    </div>
                </div>
            `  
        };
        

        // Send the email (return a Promise)
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    reject(error); 
                } else {
                    console.log(`Email sent: ${info.response}`);
                    resolve(info.response); 
                }
            });
        });
    } catch (error) {
        console.error('Error in sendingEmails:', error);
        throw error; 
    }
};
