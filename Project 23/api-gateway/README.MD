to generate gRPC types:
```bash
npm i ts-proto@1.158.0

protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" --ts_proto_out=./ --ts_proto_opt=nestJs=true ./src/proto/users.proto
```