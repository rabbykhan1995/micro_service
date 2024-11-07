import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async (token) => {
    const tokenIsVerified = await jwt.verify(token, process.env.JWT_SECRET );
    
    if(!tokenIsVerified){
        return false;
    }

    return tokenIsVerified;
}