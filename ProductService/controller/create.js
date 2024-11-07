import prisma from "../utils/prisma.js";

export const productCreate = async (req, res) => {

    const id = req.id;
    const {title, name, description, price, inStock, quantity, category } = req.body;
    // now I have to add here the checkpoint of the user is merchant or not? if merchant then proceed the flow, or break it and return response
    try {
       const productCreate = await prisma.product.create({data:{
        title,
        merchantId: parseInt(id),
        description,
        name,
        price: parseInt(price),
        inStock,
        quantity: parseInt(quantity),
        category
       }})

       if(!productCreate){
        return res.status(402).json({msg:'product creation failed'});
       }

       return res.status(200).json({msg: 'product created successfully'});
        
    } catch (error) {
        console.log('error in product create route', error)
        return res.status(500).json({msg:'internal server error'})
       
    }
}