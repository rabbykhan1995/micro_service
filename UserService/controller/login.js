import { comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import prisma from "../utils/prisma.js";

export const loginUser = async (req, res) => {
  try {
      const {email, password} = req.body;
  
      const user = await prisma.user.findUnique({where:{email}});
  
      if(!user){
          return res.status(404).json({msg:'unknown credentials'});
      }
  
      const passwordVerified = await comparePassword(user.password, password);
  
      if(!passwordVerified){
          return res.status(404).json({msg:'unknown credentials'});
      }
      
      const token = await generateToken(user.id);
  
      res.cookie('token', token);
      
      return res.status(200).json({msg:'login successfull', data:user});
  } catch (error) {
    console.log('error in login user : ', error);
    return res.status(500).json({msg:'internal server error'});
  }
}