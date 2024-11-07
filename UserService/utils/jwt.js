import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = async (userId) => {
    
        const token = await jwt.sign({id:userId}, process.env.JWT_SECRET, process.env.JWT_EXPIRE);
        return token;
   
}

export const verifyToken = async (token) => {
    const decoded = await jwt.decode(token, process.env.JWT_SECRET);
    if(!decoded){
        return null;
    }
    return decoded;
}