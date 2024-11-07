import { comparePassword, hashPassword } from '../utils/bcrypt.js';
import prisma from '../utils/prisma.js';

export const editUser = async (req, res) => {
    const id = req.id;
    var updateObject = {};
    const {username, oldPassword,newPassword, activeType} = req.body;
try {

    if(username){
        updateObject.username = username;
    }
     
    if(activeType){
        updateObject.activeType = activeType;
    }

    if(newPassword && oldPassword){
        const verifyoldpass  = await comparePassword(oldPassword);
        if(!verifyoldpass){
           return res.json({msg:'incorrect password'});
        }
        const hashedPassword = await hashPassword(newPassword);
        updateObject.password = hashedPassword;
        
    }
    
    
    const userUpdated = await prisma.user.update({ where:{id:parseInt(id)},
        data: updateObject,
    });

    if(!userUpdated){
        
        return res.status(401).json({msg:'failed to update user'});
    }

    return res.status(200).json({msg:'successfull', user:userUpdated})
} catch (error) {
    console.log('error in server - at user update',error)
   res.status(500).json({msg:'server error'}) 
}
}