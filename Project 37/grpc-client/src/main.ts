import { credentials } from '@grpc/grpc-js';
import { ItemsServiceClient } from './proto-ts/items';

const testHero = () => {
  const itemsClient = new ItemsServiceClient(
    'localhost:9091',
    credentials.createInsecure()
  );

  const deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 1);

  itemsClient.waitForReady(deadline, (error) => {
    if (error) {
      console.error('error while waiting for ItemsClient ready: ', error);
      return;
    }

    console.log('ItemsClient is ready!');

    // CreateItem
    itemsClient.createItem(
      { name: 'item#2', quantity: 20 },
      (error, response) => {
        if (error) {
          console.error('error while createItem one: ', error);
          return;
        }
        console.log('The ItemsClient.createItem result', response);
        itemsClient.close();
        console.log('ItemsClient closed');
      }
    );

    // GetItem
    itemsClient.getItem(
      { id: 'a3165374-cbc6-41b8-91b6-f1ada37f2db9' },
      (error, response) => {
        if (error) {
          console.error('error while getItem one: ', error);
          return;
        }
        console.log('The ItemsClient.getItem result', response);
        itemsClient.close();
        console.log('ItemsClient closed');
      }
    );

    // GetItem
    const items = itemsClient.streamItems(() => {});
    items.on('data', (response) => {
      console.log('The ItemsClient.streamItems result', response);
    });
  });
};

testHero();
