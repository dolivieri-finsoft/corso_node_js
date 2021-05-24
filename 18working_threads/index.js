const { Worker, isMainThread } = require('worker_threads');

if (isMainThread) {
  // This re-loads the current file inside a Worker instance.
  console.log('now i am in main thread');
  new Worker(__filename);
  new Worker(__filename);
} else {
    
  console.log('Inside Worker!');
  console.log(isMainThread);  // Prints 'false'.
  for(let i=0; i<100000; i++)
    if(i%10000==0) console.log(i);
    
}