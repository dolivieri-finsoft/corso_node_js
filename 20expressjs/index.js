// premessa: per utilizzare express js, siccome è un package accessorio disponibile su npm
// devo prima installarlo mediante comando npm install
// si consiglia di usare il comando:
// npm install express --save
// in modo da relegare la dipendenza dentro la cartella di progetto stessa e rendere più facile la distribuzione successiva

// --save crea ovviamente la cartella node_modules dentro la cartella progetto dove troveremo:
// express e tutte le sue dipendenze per poter girare

// nel caso in cui ci sia package-lock.json ma NON node_modules - si può usare la npm install per ripristinare la chain di dipendenze:
// da dentro la cartella di progetto fare:
// npm i
// oppure
// npm install

var express = require('express');
var path = require('path');
var app = express();

// servo gli statici
let _stat = path.join( __dirname,  '/assets');
console.log('serve static folder: ', _stat);
app.use('/testi', express.static(_stat));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res, next) {
  res.send('hello world');
});
app.get('/pip?o(.txt)?', function(req, res, next) {
  res.send('ciao mondo');
});
app.get('/user/profile/:iduser', function(req, res, next) {
  switch(req.params.iduser){
    case '1': 
      res.json({type:'ok', data:['dino', 'torino', 'musica e arte']});
      break;
    case '2': 
      res.json({type:'ok', data:['pippo', 'milano', 'calcio']});
      break;
    default:
      res.json({type:'error', data:'unknown iduser'});

  }
});
// listen  to launch server
app.listen(9000);