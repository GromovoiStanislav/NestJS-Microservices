## NestJS Microservices monorepo with RabbitMQ

#### Monorepo create:

```
nest g app billing
```


#### Create Common library

```
nest g lib common
```


#### Start:

```
npm run start:dev main
npm run start:dev billing
```