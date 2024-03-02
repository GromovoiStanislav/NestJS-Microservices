"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const items_1 = require("./proto-ts/items");
const testHero = () => {
    const itemsClient = new items_1.ItemsServiceClient('localhost:9091', grpc_js_1.credentials.createInsecure());
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 1);
    itemsClient.waitForReady(deadline, (error) => {
        if (error) {
            console.error('error while waiting for ItemsClient ready: ', error);
            return;
        }
        console.log('ItemsClient is ready!');
        // CreateItem
        itemsClient.createItem({ name: 'item#2', quantity: 20 }, (error, response) => {
            if (error) {
                console.error('error while createItem one: ', error);
                return;
            }
            console.log('The ItemsClient.createItem result', response);
            itemsClient.close();
            console.log('ItemsClient closed');
        });
        // GetItem
        itemsClient.getItem({ id: 'a3165374-cbc6-41b8-91b6-f1ada37f2db9' }, (error, response) => {
            if (error) {
                console.error('error while getItem one: ', error);
                return;
            }
            console.log('The ItemsClient.getItem result', response);
            itemsClient.close();
            console.log('ItemsClient closed');
        });
        // GetItem
        const items = itemsClient.streamItems(() => { });
        items.on('data', (response) => {
            console.log('The ItemsClient.streamItems result', response);
        });
    });
};
testHero();
