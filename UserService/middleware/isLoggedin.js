import { verifyToken } from '../utils/jwt.js';

const isLoggedIn = async (req, res, next) => {
    const token = req.cookies?.token;
    if(!token){
       return next()
    }

    const tokenVerified = await verifyToken(token);
    if (!tokenVerified){
        return next()
    }

  return res.json({msg:'you are already logged in'});
}

export default isLoggedIn;