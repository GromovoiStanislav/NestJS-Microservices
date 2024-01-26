## NestJS Microservices monorepo with gRPC (ts-proto)

#### Monorepo create:

```
nest g app todo
```

edit nest-cli.json !!!

#### Start:

```
npm run start:dev todo
npm run start:dev api
```

#### Prisma:

```
npm i prisma -D
npm i @prisma/client
npx prisma init
npx prisma migrate dev
npx prisma migrate dev --name init
npx prisma introspect
npx prisma generate
npx prisma studio
```

#### generate gRPC types with ts-proto

```
npm install -D ts-proto

protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/*.proto
```