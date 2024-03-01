## Example of a gRPC (ts-proto) microservice


#### generate gRPC types with ts-proto

```
npm install -D ts-proto

protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" --ts_proto_out=./proto-ts --proto_path=../protos ../protos/*.proto --ts_proto_opt=lowerCaseServiceMethods=true --ts_proto_opt=outputEncodeMethods=false --ts_proto_opt=outputJsonMethods=false --ts_proto_opt=outputClientImpl=false --ts_proto_opt=snakeToCamel=true
```
