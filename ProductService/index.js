import express from 'express'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()

import router from './routes/route.js';
const app = express();

app
.use(express.json())
.use(cookieParser())
.use('/product', router);

app.get('/', (req, res) => {
    res.json({msg: 'this is product service'})
})


app.listen(process.env.PORT, (err) => {
    console.log('product is listening on port 3002')
     if(err){
        console.log(err);
        process.exit();
     }
})