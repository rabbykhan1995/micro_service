import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
    clientId:"my-app",
    brokers:["localhost:9092"]
})


export const consumeMessage = async (groupId, topic) => {
    const consumer = kafka.consumer({groupId:groupId });

    await consumer.connect();

   await consumer.subscribe({topic:topic, fromBeginning: true});

 try {
      await consumer.run({ 
       eachMessage: async ({ topic, partition, message }) => {
        
           
           const convertMessage = message.value ? message.value.toString() : null;
            
           console.log(convertMessage) 
     }
    }) 

    // await consumer.disconnect();
    const timeout = 5000; // Time in milliseconds to run the consumer
    await new Promise(resolve => setTimeout(resolve, timeout));

    // Disconnect the consumer after the timeout
    await consumer.disconnect();

 } catch (error) {
    console.log('error in consumeMessage function', error)
 }
}

