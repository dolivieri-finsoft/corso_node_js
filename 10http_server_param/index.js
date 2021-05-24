const http = require('http');
const querystring = require('querystring');
const listen_port = 8123;

const server = http.createServer((req, res) => {
    console.log('ricevuta una richiesta - ', Date());

    // TODO: se ho un parametro in get 
    // cmd=shutdown
    // -> server http si spegne (cosa assurda ma è un esperimento)
    // in ogni altro caso risponde hello <ip del chiamante>
    // dove in IP del chiamente mostro l'ip di ha fatto la richiesta

    let myurl = new URL(req.url, 'http://'+req.headers.host);
    
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    
    if(myurl.searchParams.get('cmd') == 'shutdown'){
        res.end('sto per buttare giù il server..');
        // lo buttiamo giù al primo giro dopo
        server.close();

    } else {
        res.end('hello '+req.headers.host);
    }
});

console.log('trying to listen on port '+listen_port);
server.listen(listen_port);
