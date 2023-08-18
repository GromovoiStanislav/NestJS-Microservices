const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    const message = data.toString('utf-8');
    console.log(message); // '69#{"pattern":{"cmd":"sum"},"data":[1,2,3],"id":"f4bac790733d6ecc910bb"}')

    // Найдите позицию символа "#" в сообщении
    const separatorIndex = message.indexOf('#');
    // Извлеките JSON-строку, начиная после позиции "#"
    const jsonMessage = message.substring(separatorIndex + 1);
    // Распарсите JSON-строку в объект
    const parsedMessage = JSON.parse(jsonMessage);

    if (parsedMessage.pattern && parsedMessage.pattern.cmd === 'sum') {
      const responseObj = {
        response: (parsedMessage.data || []).reduce((a, b) => a + b),
        isDisposed: true,
        id: parsedMessage.id,
      };

      const jsonResponse = JSON.stringify(responseObj);
      socket.write(Buffer.from(`${jsonResponse.length}#${jsonResponse}`));
      // 61#{"response":6,"isDisposed":true,"id":"f4bac790733d6ecc910bb"}
    }
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', () => {
    console.log('Client disconnected');
  });
});

server.listen(5001, () => {
  console.log('TCP server listening on port 5001');
});
