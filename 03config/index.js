// in questo codice mostreremo come leggere dati da package.json

let pjson = require('./package.json');
let config = require('./config.json');

console.log(config.welcome_message + pjson.name + " (" + pjson.version + ")" );
console.log(pjson.description);

setTimeout(function(){ 
	console.log('passati '+config.timeout+' secondi');
}, config.timeout*1000);


