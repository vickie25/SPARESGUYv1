import jwt from "jsonwebtoken";

const generateToken  = (res, id)=>{
    const secret = process.env.JWT_SECRET;
  
    const token = jwt.sign({id}, secret, {
        expiresIn: '30d'
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
}

export default generateToken;