import { comparePassword } from '../utils/bcrypt.js';
import prisma from '../utils/prisma.js';

export const deleteUser = async (req, res) => {
    const id = req.id;
 const {confirmPassword} = req.body;
try {

   
    const verifypassword  = await comaprePassword(confirmPassword);
        if(!verifypassword){
           return res.json({msg:'incorrect password'});
        }
    
    const deletedUser = await prisma.user.delete({where:{
        id:id
    }});

    res.clearCookies('token');
    return res
    .status(200).json({msg:'you are no longer with us'});
  
} catch (error) {
    console.log('error in server - at user delete',error)
   res.status(500).json({msg:'server error'})  
}
}