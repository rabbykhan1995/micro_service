export const userLogout = async ( req, res ) => {
     const id = req.id;
     res.clearCookie('token');
     return res.status(200).json({msg:'logout successfull'})
}