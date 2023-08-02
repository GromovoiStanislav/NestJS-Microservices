const protoLoader = require('@grpc/proto-loader')
const grpc = require('@grpc/grpc-js')
const path = require("node:path");
const protoFileName = "../proto/hero.proto"

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, protoFileName),
  {});
const proto = grpc.loadPackageDefinition(packageDefinition)

const client = new proto.hero.HeroesService('0.0.0.0:50051', grpc.credentials.createInsecure());

client.findOne({ id: "2" }, (error, response) => {
  if (error) {
    console.error(error)
    return;
  }
  console.log("find hero from server " + JSON.stringify(response))
})
