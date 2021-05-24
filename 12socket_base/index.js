// parliamo del modulo Net
// https://nodejs.org/docs/latest-v12.x/api/net.html
// come costruire un mini HELO server

const net = require('net');
const fs = require('fs');
const path = require('path');

// init, preload, etc..

const iam = "chat miniserver 1.0.12";
let _help = {
  'en': fs.readFileSync(path.join(__dirname, 'help/en.txt')),
  'it': fs.readFileSync(path.join(__dirname, 'help/it.txt'))
};

const connected_clients = new Set();

connected_clients.listConnected = function(){
    let _carray = [];
    for(let sock of this){
        _carray.push(sock.remoteAddress+':'+sock.remotePort);
    }
    return _carray;
};

connected_clients.broadcast = function(what, exceptClient){
    for(let sock of this){
        if(sock !== exceptClient){
            sock.write(what);
        }
    }
};

const server = net.createServer((client_stream) => {
  
  // evento al collegamento di un client

  console.log('i am server at: ', client_stream.localAddress, client_stream.localPort);
  console.log('client connected', client_stream.remoteAddress, client_stream.remotePort);

  connected_clients.add(client_stream);

  connected_clients.broadcast('['+client_stream.remoteAddress+':'+ client_stream.remotePort+'] NOW CONNECTED..\r\n', client_stream);
  
  client_stream.on('data', (data)=>{
    let cmd = data.toString().trim();
    console.log(Date.now(), client_stream.remoteAddress, client_stream.remotePort, cmd);
    switch(cmd){
        case 'who':
            client_stream.write(iam+'\r\n');
            break;

        case 'now':
            client_stream.write((new Date()).toISOString()+'\r\n');
            break;

        case 'howmany':
            client_stream.write(connected_clients.size+'\r\n');
            break;

        case 'list':
            // mi da la lista completa di tutti i client connessi me compreso (ip:porta)
            client_stream.write(connected_clients.listConnected().join(', ')+'\r\n');
            break;

        case 'help':
            client_stream.write(_help.en);
            break;

        case 'aiuto':
            client_stream.write(_help.it);
            break;
        
        default:
            // broadcast a tutti tranne me del messaggio
            connected_clients.broadcast('['+client_stream.remoteAddress+':'+ client_stream.remotePort+'] '+cmd+'\r\n', client_stream);
    }
  });

  client_stream.on('error', (err) => {
    connected_clients.delete(client_stream);
    console.log("(a client socket ["+ client_stream.remoteAddress + ":" + client_stream.remotePort + "] error occurred: "+ err+")");
  });
  
  client_stream.on('end', () => {
    console.log('client disconnected', client_stream.remoteAddress, client_stream.remotePort);
    connected_clients.broadcast('['+client_stream.remoteAddress+':'+ client_stream.remotePort+'] DISCONNECTED!\r\n', client_stream);
    connected_clients.delete(client_stream);
  });
  
  client_stream.write(iam+'\r\n');
  client_stream.write('hello!\r\n');
  
});

server.on('error', (err) => {
  console.log("(a server socket error occurred: "+ err+")");
});

server.listen(8124, () => {
  console.log('server bound');
});

setInterval(function(){
  connected_clients.broadcast('another minute passed..\r\n', null);
},60000)