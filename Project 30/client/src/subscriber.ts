import { JSONCodec, connect } from 'nats';

const main = async () => {
  const nc = await connect({ servers: 'nats://127.0.0.1:4222' });
  console.log('Connected to NATS');

  const jc = JSONCodec();

  {
    const sub = nc.subscribe('hello2');
    (async () => {
      for await (const m of sub) {
        console.log('hello', jc.decode(m.data));

        if (m.headers) {
          for (const [key, value] of m.headers) {
            console.log(`${key}=${value}`);
          }
          // reading/setting a header is not case sensitive
          //console.log('id', m.headers.get('id'));
        }

        m.respond(jc.encode({ response: 'Hello NEST!' }));
      }
    })();
  }

  {
    const sub = nc.subscribe('notification2');
    (async () => {
      for await (const m of sub) {
        console.log('notification', jc.decode(m.data));

        if (m.headers) {
          // reading/setting a header is not case sensitive
          console.log('id', m.headers.get('id'));
          console.log('unix_time', m.headers.get('unix_time'));
        }
      }
    })();
  }
};

main();
