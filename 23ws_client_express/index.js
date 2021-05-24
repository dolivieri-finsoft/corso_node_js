var express = require('express');
var path = require('path');
var app = express();

// servo gli statici
let _stat = path.join( __dirname,  '/assets');
console.log('serve static folder: ', _stat);
app.use('/', express.static(_stat));

// listen  to launch web server
app.listen(9000);