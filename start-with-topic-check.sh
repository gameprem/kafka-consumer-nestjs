#!/bin/bash

# ========== CONFIG ==========
KAFKA_BROKER="localhost:29092"  # หรือ 9092 หากรันใน container เดียวกับ Kafka
TOPIC_NAME="mqtt_topic"
PARTITIONS=1
REPLICATION_FACTOR=1
# ============================

echo "🔍 Checking if topic '$TOPIC_NAME' exists on $KAFKA_BROKER ..."

# ตรวจสอบว่า topic มีอยู่หรือไม่
EXISTS=$(docker run --rm --network=host confluentinc/cp-kafka:7.4.0 \
  kafka-topics --bootstrap-server $KAFKA_BROKER --list | grep -w $TOPIC_NAME)

if [ -z "$EXISTS" ]; then
  echo "❌ Topic '$TOPIC_NAME' does not exist. Creating..."
  docker run --rm --network=host confluentinc/cp-kafka:7.4.0 \
    kafka-topics --bootstrap-server $KAFKA_BROKER \
    --create --topic $TOPIC_NAME \
    --partitions $PARTITIONS \
    --replication-factor $REPLICATION_FACTOR
  echo "✅ Topic '$TOPIC_NAME' created."
else
  echo "✅ Topic '$TOPIC_NAME' already exists."
fi

echo "🚀 Starting NestJS server..."
npm run start
