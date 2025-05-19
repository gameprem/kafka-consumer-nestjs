import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // Start Kafka Microservice
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['localhost:29092'],
  //     },
  //     consumer: {
  //       groupId: 'test-group',
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(3002);
  console.log('App listening on port 3000 and Kafka consumer started');
}

bootstrap();
