import prisma from '../utils/prisma.js';

export const accountMigrate = async (req, res) => {
    const id = req.id;
    

    try {
        const userType = await  prisma.userTypeAssignment.findUnique({where:{userId:id}});

        if(!userType){
            return res.status(404).json({msg:'user not found'});
        }

        if(userType.type.includes('MERCHANT')){
            return res.status(401).json({msg:'user already a merchant'});
        }

        const typeUpdated = await prisma.userTypeAssignment.update({
            where:{userId:id},
            data:{
                
            }
        })
    } catch (error) {
        console.log('error in migrate user Type : ', error);
        return res.status(500).json({msg:'internal server error'});
    }
}