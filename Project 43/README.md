## NestJS Microservices monorepo with Kafka and Prisma

#### Monorepo create:

```
nest g app payments
```

#### Prisma create:
```
npm i prisma -D
npm i @prisma/client
npx prisma init
npx prisma migrate dev
npx prisma migrate dev --name init
npx prisma introspect
npx prisma studio
npx prisma generate
```

#### Start:

```
npm run start:dev orders
npm run start:dev payments
```