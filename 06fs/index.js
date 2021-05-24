const fs = require('fs');
let miojson = 'C:/Users/Dino-PC/Desktop/nodetest/06fs/package.json';
let miofile = 'C:/Users/Dino-PC/Desktop/nodetest/06fs/test.txt';
let miadir = 'C:/Users/Dino-PC/Desktop/nodetest/06fs/testdir';
let miadirdeep = 'C:/Users/Dino-PC/Desktop/nodetest/06fs/testdir/pippo/pluto';

let jstr = fs.readFileSync(miojson, 'utf8');
let jo = JSON.parse(jstr);
console.log("old description: ", jo.description);
jo.description = "nuova descrizione del file package json, ex giro per fs";
fs.writeFileSync(miojson, JSON.stringify(jo,null,3), 'utf8');

/*
fs.writeFile(miofile, 'Hello Node.js', 'utf8', (err) => {
  
  if (err){
	console.error(err);
  } else{
	console.log(miofile, 'written');
  }
  
});
*/
try{
	fs.writeFileSync(miofile, 'Hello Node.js', 'utf8');
} catch(err){
	console.error('[writeFileSync]', err);
}

try {
  fs.appendFileSync(miofile, '\naltra riga...');
} catch (err) {
  console.error('[appendFileSync]', err);
}

//process.exit(0);

// cancello dopo aver creato -> sync

/*
fs.unlink(miofile, (err) => {
  
  if (err){
	console.error(err);
  } else{
	console.log(miofile, 'deleted');
  }
  
});
*/
try{
	fs.unlinkSync(miofile);
} catch(err){
	console.error('[unlinkSync]', err);
}
/*
fs.mkdir(miadirdeep, { recursive: true }, (err) => {
  if (err){
	console.error(err);
  } else{
	console.log(miadir, 'created');
  }
});

fs.rmdir(miadir, { recursive: true }, (err) => {
  if (err){
	console.error(err);
  } else{
	console.log(miadir, 'removed');
  }
});
*/
try{
	fs.mkdirSync(miadirdeep, { recursive: true });
	fs.rmdirSync(miadir, { recursive: true });
} catch(err){
	console.error('mkdir rmdir sync', err);
}
