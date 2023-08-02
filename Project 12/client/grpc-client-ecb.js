const protoLoader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')
const path = require("node:path");
const protoFileName = "../proto/ecb-provider.proto"

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, protoFileName),
  {});
const proto = grpc.loadPackageDefinition(packageDefinition)

const client = new proto.ecbProvider.EcbProvider('0.0.0.0:50052', grpc.credentials.createInsecure());

client.getRates({}, (error, response) => {
  if (error) {
    console.error(error)
    return;
  }
  console.log(JSON.stringify(response,null,2))
})
