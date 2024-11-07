import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt.js';

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
       return res.status(402).json({msg:'unauthorized request'});
    }

    const tokenIsVerified = await verifyToken(token);

    if(!tokenIsVerified){
        return res.status(402).json({msg:'unauthorized request'})
    }

    req.id = tokenIsVerified.id;

    return next()
}

export default authenticate;