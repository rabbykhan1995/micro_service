import { Kafka } from ('kafkajs');
import { v4 as uuidv4 } from ('uuid');

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: ['localhost:9092'], // Update with your Kafka broker address
});

const producer = kafka.producer();

export const senduserRequest = async (Id) => {
  await producer.connect();
  const correlationId = uuidv4(); // Generate a unique correlation ID
  await producer.send({
    topic: 'for-userId',
    messages: [
      { 
        value: JSON.stringify({ Id, correlationId }) 
      },
    ],
  });
  console.log('user request sent with correlation ID:', correlationId);
};

export const disconnectProducer = async () => {
  await producer.disconnect();
};

