import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, EachBatchPayload } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: 'kafka-consumer',
    brokers: ['localhost:29092'],
  });
  private consumer = this.kafka.consumer({ groupId: 'test-group' });

  constructor() {}

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'mqtt_topic',
      fromBeginning: false,
    });

    await this.consumer.run({
      eachBatch: async ({ batch }) => {
        console.log('Received batch:', batch.messages.map((msg) => msg.value!.toString()));
        // const data = batch.messages.map((msg) =>
        //   JSON.parse(msg.value!.toString()),
        // );
        // console.log('Received batch:', data);
      },
      // eachMessage: async ({ topic, partition, message,  }) => {
      //     const data = JSON.parse(message.value!.toString());
      //     console.log('Received message:', data);
      // },

      //   eachBatch: ({ batch }: EachBatchPayload) => {
      //     const data = batch.messages.map((msg) =>
      //       JSON.parse(msg.value!.toString()),
      //     );
      //     console.log('Received batch:', data);
      //   },
    });
  }
}
