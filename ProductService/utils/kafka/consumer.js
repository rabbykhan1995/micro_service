import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: 'product-service',
  brokers: ['localhost:9092'], // Update with your Kafka broker address
});

const consumer = kafka.consumer({ groupId: 'product-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'merchant_topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { merchantId } = JSON.parse(message.value.toString());
      console.log('Received Merchant ID:', merchantId);

      // Here, you can create a product using the received merchantId
      // Example: await prisma.product.create({ data: { merchantId, ... } });
    },
  });
};

run().catch(console.error);