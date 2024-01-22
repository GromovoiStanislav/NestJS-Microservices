import { JSONCodec, connect, headers } from 'nats';
const main = async () => {
    const nc = await connect({ servers: 'nats://127.0.0.1:4222' });
    console.log('Connected to NATS');
    const jc = JSONCodec();
    const h = headers();
    h.set('id', '123456');
    h.append('unix_time', Date.now().toString());
    const reply = await nc.request('hello', JSON.stringify({ data: 'Hello', id: 'myid' }), // Nest expects the data to have the following structure
    // @ts-ignore
    { headers: h });
    console.log(jc.decode(reply.data));
    nc.publish('notification', jc.encode({ data: 'Hello', id: 'myid' }), // Nest expects the data to have the following structure
    { headers: h });
    nc.drain();
};
main();
