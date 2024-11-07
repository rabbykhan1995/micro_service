import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId:"my-app",
    brokers:["localhost:9092"]
})
const producer = kafka.producer();

export const produceMessage = async (topic, message) => {
    try {
         await producer.connect();
         await producer.send({
            topic: topic,
            messages:[
                 {value:JSON.stringify(message)}
            ]
         });
    
        
    } catch (error) {
        console.log('error in producer', error);
    }finally{
        await producer.disconnect();
    }
}