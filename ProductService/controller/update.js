import prisma from "../utils/prisma.js";

export const updateUser = async (req, res) => {

       const productId = req.params.id;
       const userId = req.id;
      const { title, name, description, price, quantity, inStock, category } = req.body;

      var updateObject;
         if(title){
            updateObject.title = title;
         }

         if(name){
            updateObject.name = name;
         }

         if(description){
            updateObject.description = description;
         }

         if(price){
            updateObject.price = parseInt(price);
         }

         if(quantity){
            updateObject.quantity = parseInt(quantity);
         }

         if(inStock){
            updateObject.inStock = inStock;
         }

         if(category){
            updateObject.category = category;
         }
      try {
        const productUpdated = await prisma.product.update({where:{productId}, data:updateObject});

        if(!productUpdated){
            return res.status(403).json({msg:'update failed'})
        }

        return res.status(201).json({msg:'successfull', data:productUpdated});
      } catch (error) {
        console.log('error in product update : ', error )
        return res.status(501).json({msg:'internal server error'});
      }
}