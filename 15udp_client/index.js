// parliamo del modulo udp/datagram
// https://nodejs.org/docs/latest-v12.x/api/dgram.html

const dgram = require('dgram');

const message = Buffer.from('Questo è il mio messaggio.');

const client = dgram.createSocket('udp4');

setInterval(function(){
  client.send(message, 41234, 'localhost', (err) => {
    //
  });
}, 1000);

client.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  client.close();
});

client.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

client.on('listening', () => {
  const address = client.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

client.bind(41235);
client.send(Buffer.from('MYPORT:41235'), 41234, 'localhost', (err) => {
  //
});