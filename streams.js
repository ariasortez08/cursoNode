const fs = require('fs');
const server = require('http').createServer();

console.clear();

server.on('request', (req, res) => {
  // ! Solution 1 - FS

  /* fs.readFile('./starter/test-file.txt', (err, data) => {
        if (err) console.log(err);
        res.end(data);
      }); */

  // ? Solution 2 - STREAMS

  /*   const readable = fs.createReadStream('./starter/test-file.txt');
  readable.on('data', (chunk) => {
    res.write(chunk);
  });
  readable.on('end', () => {
    res.end();
  });
  readable.on('error', (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end('File not found');
  }); */

  // * Solution 3 - PIPE OPERATOR
  const readable = fs.createReadStream('./starter/test-file.txt');
  readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening');
});
