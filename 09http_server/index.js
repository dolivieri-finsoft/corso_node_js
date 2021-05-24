const http = require('http');
const listen_port = 8123;

const server = http.createServer((req, res) => {
    console.log('ricevuta una richiesta - ', Date());

    let body = "<h1>Hello world愛</h1>";

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(body);
});

console.log('trying to listen on port '+listen_port);
server.listen(listen_port);

