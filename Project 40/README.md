## NestJS Microservices monorepo with kafka

A sample application showcasing Apache Kafka fan-out approach, the web services are based on NestJS.
Multiple consumer groups have been used to ensure messages are spread to all the consumers.

#### Monorepo create:

```
nest g app crm
nest g app mailer
```

#### Start:

```
npm run start:dev api-gateway
npm run start:dev crm
npm run start:dev mailer
```