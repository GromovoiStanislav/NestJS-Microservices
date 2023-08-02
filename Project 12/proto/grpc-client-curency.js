const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const path = require("node:path");
const protoFileName = "currency-converter.proto";

const packageDefinition = protoLoader.loadSync(protoFileName, {
  includeDirs: [__dirname]
})
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.currencyConverter.CurrencyConverter("0.0.0.0:50053", grpc.credentials.createInsecure());

client.convert({
  sellAmount: 100,
  sellCurrency: "USD",
  buyCurrency: "GBP"
}, (error, response) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(JSON.stringify(response, null, 2));
});
