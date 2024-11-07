import express from 'express';
import { produceMessage } from './kafka/producer.js';
import { consumeMessage } from './kafka/consumer.js';
import { kafka } from './kafka/kafka.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => { 


    res.json({msg:'this is kafka server'});
 })

 .post('/produce-message', async (req, res) => { 
    const { message } = req.body;
    try {
        await produceMessage('test-topic', message);
        return res.json({msg:'message send successfully'});

    } catch (error) {
        console.log('error in produce-message route : ', error)
        return res.json({msg:'internal server error'});
    }
  })

  .post('/consume-message', async (req ,res) => { 
      const {topic} = req.body;
      try {
        const consumedMessage = await consumeMessage('test-group',topic);

        return res.json({msg:'message consumed successfull'});
      } catch (error) {
        console.log('error in consume-message route : ', error)
        return res.json({msg:'internal server error'}); 
      }
   })

app.listen(3004);