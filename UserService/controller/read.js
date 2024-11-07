import prisma from "../utils/prisma.js";

export const readUser = async (req, res) => {
   try {
    const id = req.id;

    const user = await prisma.user.findUnique({where:{id}});

    if(user){
        return res.status(200).json({msg:'reading successfull', data:user});
    }
    

    res.clearCookie('token');
    return res.status(402).json({msg:'no user found'})
   } catch (error) {
    console.log('error in server reading user data :' , error)
    return res.status(500).json({msg: 'internal server error'})
   }
}