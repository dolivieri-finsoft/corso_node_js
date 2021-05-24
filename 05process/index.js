console.log(process.pid);
console.log(process.env);
console.log(process.platform);
console.log(process.resourceUsage());
console.log(process.memoryUsage());

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});



setInterval(function(){
 console.log('.');
}, 1000);

// qui termina i codice di index.js
console.log('fine di index.js');

