## Example of a gRPC (ts-proto) microservice


#### generate gRPC types with ts-proto

```
npm install -D ts-proto

protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" --ts_proto_out=. ./src/items/*.proto --ts_proto_opt=nestJs=true
```
