import { verifyToken } from '../utils/jwt.js';

const authenticated = async (req, res, next) => {
    const token = req.cookies?.token;
    if(!token){
        res.status(402).json({msg:'unauthorized request'});
    }

    const tokenVerified = await verifyToken(token);
    if (!tokenVerified){
        res.status(402).json({msg:'unauthorized request'});
    }

    req.id = parseInt(tokenVerified.id);

    next()
}

export default authenticated;