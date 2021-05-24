// parliamo del modulo udp/datagram
// https://nodejs.org/docs/latest-v12.x/api/dgram.html

const dgram = require('dgram');

const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });

const multicastPort = 5555;
const multicastAddress = '239.255.255.255';

setInterval(function () {
  
  let testMessage = 'sono le '+Date();

  socket.send(Buffer.from(testMessage),
      0,
      testMessage.length,
      multicastPort,
      multicastAddress,
      function (err) {
        if (err) console.log(err);
        console.log("Message sent");
      }
  );
}, 1000);


socket.bind(multicastPort);
socket.on("listening", function(){
  socket.addMembership(multicastAddress);
})

socket.on("message", function ( data, rinfo ) {
  console.log("Message received from ", rinfo.address, " : ", data.toString());
});