// come leggere parametri da linea comandi e default vari da una config

// sia che aggiunga o meno la linea
// successiva funziona perchè process è inclusa di default

const _process = require('process');
const process = require('process');

console.log('test ref', _process === process );

const _argv = process.argv;

_argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

let config = require('./config.json');
let _config = require('./config.json');
console.log('test ref 2', config === _config );

//if(typeof process.argv[2] === 'undefined')
//	process.argv[2] = config.defaults[0];

if(typeof process.argv[2] === 'undefined')
	process.argv.push(config.defaults[0]);


console.log(process.argv[2]);
