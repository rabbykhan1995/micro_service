import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/route.js';
dotenv.config();

const app = express();

app
.use(cookieParser())
.use(express.json())
.use('/user', router);

app.get('/', (req, res) => {
    res.status(200).json({msg:'this is user service'});
} )

app.listen(process.env.PORT, (err)=> {
    if(err){
        console.log('error in user service', err);
        process.exit();
    }
    
    console.log('user service is listening',process.env.PORT);
    
});