// in questo codice mostreremo come leggere dati da package.json

let pjson = require('./package.json');
console.log(pjson.name);
console.log(pjson.description);
console.log(pjson.version);
console.log(pjson.scripts.test);
console.log(pjson.miecose.join(' - '));