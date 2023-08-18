const net = require('net');
const { randomUUID } = require('crypto');

const client = new net.Socket();

client.connect(5002, 'localhost', () => {
  console.log('Connected to server');

  //'69#{"pattern":{"cmd":"sum"},"data":[1,2,3],"id":"f4bac790733d6ecc910bb"}')

  const message = {
    pattern: {
      cmd: 'sum',
    },
    data: [1, 2, 3],
    id: randomUUID(),
  };

  const jsonMessage = JSON.stringify(message);

  client.write(Buffer.from(`${jsonMessage.length}#${jsonMessage}`));
});

client.on('data', (data) => {
  const receivedData = data.toString('utf-8');
  // 61#{"response":6,"isDisposed":true,"id":"f4bac790733d6ecc910bb"}

  // Найдите позицию символа "#" в сообщении
  const separatorIndex = receivedData.indexOf('#');

  // Извлеките JSON-строку, начиная после позиции "#"
  const jsonMessage = receivedData.substring(separatorIndex + 1);

  // Распарсите JSON-строку в объект
  const parsedMessage = JSON.parse(jsonMessage);
  //{ response: 6, isDisposed: true, id: 'f4bac790733d6ecc910bb' }

  console.log('response', parsedMessage.response);
  client.end();
});

client.on('error', () => {
  console.log('Connection closed');
});

client.on('close', () => {
  console.log('Connection closed');
});
