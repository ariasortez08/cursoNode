const EvenEmitter = require('events');
const http = require('http');

/*Esta es una instancia de la clase ? EvenEmitter*/

class Sales extends EvenEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There was a new sale');
});

myEmitter.on('newSale', () => {
  console.log('Costumer name');
});

myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit('newSale', 9);

/* @SERVIDOR */

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request Received');
  res.write('First Request');
  res.end();
});

server.on('request', (req, res) => {
  res.write('Second Request Received');
});

server.on('request', (req, res) => {
  res.write('Third Request Received');
});

server.on('close', (req, res) => {
  res.end('server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening from port http://localhost:4000/');
});
