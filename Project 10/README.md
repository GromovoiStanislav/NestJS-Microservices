## NestJS monorepo microservice with gRPC +Streaming

```
nest g app apigateway
nest g app auth
nest g library common
```

edit nest-cli.json

```
npm run start:dev apigateway
npm run start:dev auth
```

generate gRPC types:
```bash
npm install ts-proto@1.158.0

protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/auth.proto
```
