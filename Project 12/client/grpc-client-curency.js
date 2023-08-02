const protoLoader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')
const protoFileName = "./ecb-provider.proto"

const packageDefinition = protoLoader.loadSync(protoFileName, {
  includeDirs: [__dirname]
})
const proto = grpc.loadPackageDefinition(packageDefinition)

const client = new proto.ecbProvider.EcbProvider('0.0.0.0:50052', grpc.credentials.createInsecure());

client.getRates({}, (error, response) => {
  if (error) {
    console.error(error)
    return;
  }
  console.log(JSON.stringify(response,null,2))
})
