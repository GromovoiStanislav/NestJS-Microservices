## Example of a gRPC (ts-proto) microservice

#### Generate gRPC types with ts-proto

```
npm install -D ts-proto

protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" --ts_proto_out=./src/proto-ts --proto_path=./protos ./protos/*.proto --ts_proto_opt=lowerCaseServiceMethods=true --ts_proto_opt=outputServices=grpc-js --ts_proto_opt=snakeToCamel=true
```

#### Build and start

```
npm run build
npm start
```
