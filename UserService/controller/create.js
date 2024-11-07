import { hashPassword } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';
import prisma from '../utils/prisma.js';

export const createUser = async (req, res) => {
    const {username, password, email} = req.body;
try {

    const hashedPassword = await hashPassword(password);
    
    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
            email: email,
            types: {
              create: [
                
                { type: 'CONSUMER' }
              ],
            },
            activeType: 'CONSUMER',  // Set the active type initially
          },
    });

    if(!newUser){
        
        res.status(401).json({msg:'failed to create user'});
    }

    const token = await generateToken(newUser.id);
     
    res.cookie('token',token);
    return res.status(200).json({msg:'successfull', user:newUser});
} catch (error) {
    console.log('error in server - at user create',error)
   res.status(500).json({msg:'server error'})   
}
}

