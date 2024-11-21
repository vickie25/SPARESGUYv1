import express from 'express'; // Import express
import { sendMessage } from '../Controllers/ContactUsController.js'; 
const router = express.Router();

// Define the route for sending emails
router.post('/send-email', sendMessage);

export default router
