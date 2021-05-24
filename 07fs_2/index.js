const fs = require('fs');
const path = require('path');
const moment = require('moment');
const {exec} = require('child_process');

/*
const dir = fs.readdirSync("d:/temp", {withFileTypes : true});

dir.forEach((ent) => {
	let tipo = ent.isFile()?'file':'dir';
	console.log(tipo, ent.name);
})
*/
// la Dirent ci dice solo nome file e il suo tipo
// se avessimo bisogno di altre info tipo, size, permessi, lock, ..
// tempo creazione, ultima mod, etc..
// devo usare un altro metodo

// TEST 1: usare fs.Stats
//
// modificare il precedente elenco in modo da far vedere una cosa del genere:
// [dir]	nomedir		...		dataora_creazione
// [file]	nomefile	5467	dataora_creazione
//
// suggerimenti: creare una funzione che prende un parametro di path su cui eseguire il comando..
// suggerimenti: oppure usare le funzioni di sistema di fs?
// suggerimenti: per caso esiste qualche comando node che già lo fa?
// suggerimenti: magari esiste un package npm che risolve la questione?
// suggerimenti: esiste qualcuno che ha scritto una function che risolve il problema?

function dirtestSync(p){
	
	const dir = fs.readdirSync(p);

	dir.forEach((ent) => {
		const entp = path.join(p, ent);
		let s = fs.statSync(entp);
		console.log(
			s.isFile()?'[file]':'[dir]',
			ent,
			s.size,
			moment(s.ctime).format('LLL')
		);
	})	
}

// riscrivere la precedente in versione asincrona
const listdir = (basePath, callback) => {
    let dirarray = [];
    
    fs.readdir(basePath, (err, elements) => {
        elements.forEach((el) => {
            fs.stat(
                path.join(basePath, el),
                (err, stat) =>{
                    dirarray.push(
                        {
                            type: stat.isDirectory()?'[dir]':'[file]',
                            name: el,
                            size: stat.size,
                            time: stat.birthtime
                        }
                    );
                    if(dirarray.length === elements.length){
                        //chiamiamo funzione callback
                        callback(dirarray);
                    }
                }
            )
        });
    });
}

dirtestSync('d:/temp');
console.log('----------------------');

listdir('d:/temp', (dirarray) => {
    console.log(dirarray);
});

// e farlo con le funzionalità di sistema?
exec('powershell dir', (err, stdout, stderr)=>{
	console.log('---- dir -----------------------');
	console.log(stdout);
});
