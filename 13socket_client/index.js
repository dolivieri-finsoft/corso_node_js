// parliamo del modulo Net
// https://nodejs.org/docs/latest-v12.x/api/net.html
// come costruire un mini client

const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let client = {
  is_connected : false,
  socket : null
};

function connect(){
  if(!client.is_connected){

    delete client.socket;

    client.socket = net.createConnection({ host: '127.0.0.1', port: 8124 }, () => {
      // 'connect' listener.
      client.is_connected = true;
      console.log('You are connected to the server!');
    });

    client.socket.on('data', (data) => {
      console.log(data.toString());
    });
    
    client.socket.on('error', (err) => {
      console.error("(a socket error occurred: "+ err+")");
      console.info("Try use command: reconnect");
      client.is_connected = false;
    });
    
    client.socket.on('end', () => {
      console.log('disconnected from server');
    });
    
  }
}

connect();

const recursiveAsyncReadLine = function () {
  rl.question('', function (answer) {
      if (answer == 'exit'){ 
          //we need some base case, for recursion
          client.socket.end(()=>{
            client.is_connected = false;
            console.log('Chat disconnection done!');
          });
          return rl.close(); //closing RL and returning from function.
      } else if (answer == 'reconnect'){
        console.log('trying to reconnect...');
        connect();
        recursiveAsyncReadLine();
        return;
      }

      // se sono qui non ho fatto corto sui precedenti comandi
      client.socket.write(answer+'\r\n');

      recursiveAsyncReadLine(); //Calling this function again to ask new question
  });
};

recursiveAsyncReadLine();

