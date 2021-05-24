// parliamo del modulo udp/datagram
// https://nodejs.org/docs/latest-v12.x/api/dgram.html

const dgram = require('dgram');

const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });

const multicastAddress = '239.255.255.255';
const multicastPort = 5555;

socket.bind(multicastPort);
socket.on("listening", function(){
  socket.addMembership(multicastAddress);
})

socket.on("message", function ( data, rinfo ) {
  console.log("Message received from ", rinfo.address, " : ", data.toString());
});