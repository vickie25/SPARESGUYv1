import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/User.js';

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token, 'This is the token');

    const key = process.env.JWT_SECRET || 'mysparesguy102';
    console.log(key, 'This is the key');

    if (!token) {
        return res.status(401).json({ message: 'Authentication error: Token not provided' });  
    }
    const validateObjectId = (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ error: "Invalid product ID" });
        }
        next();
      };

    try {
        const decoded = jwt.verify(token, key);
        console.log(decoded, 'This is the decoded token');
        console.log(decoded.id, 'This is the decoded email');
        const user = await User.findOne({ email: decoded.id });
        console.log(user, 'This is the user');
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;

