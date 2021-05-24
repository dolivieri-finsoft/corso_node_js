const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

// how to build a basic http load balancer with cluster

if (cluster.isMaster) {

  let application_object = { req_num: 0};

  console.log('mini http cluster v1 - n. of cpus: ', numCPUs);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`child process ${worker.process.pid} died`, 'no problem.. launching another one...');
    cluster.fork();
  });

  cluster.on('message', (worker, message, handle) => {
    console.log(`MESSAGE child process ${worker.process.pid} said`, message);
    if(message.req_served){
      application_object.req_num++;
    }
    worker.send(application_object);
  });

} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let li=0; li<1000000; li++){
      res.write(characters.charAt(Math.floor(Math.random() * characters.length)));
    }
    res.end('hello world\n');

    process.send({ req_served: true});

  }).listen(8123);

  process.on('message', (m) => {
    console.log('PARENT got message:', m);
  });

  console.log(`child process ${process.pid} started`);
}