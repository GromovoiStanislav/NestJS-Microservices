## NestJS Microservices monorepo with RabbitMQ, MongoDB

```
nest g app orders
nest g app billing
nest g app auth
nest g library common
```

edit nest-cli.json

```
npm run start:dev
npm run start:dev billing
npm run start:dev auth
```
