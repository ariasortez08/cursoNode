const fs = require('fs');

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

const read = fs.readFile('test-file', 'utf-8', () => {
  console.log('I/O Finished');
});

console.log('Hello from top-level code');
