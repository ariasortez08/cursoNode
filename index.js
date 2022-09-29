const fs = require('fs');

const http = require('http');
const path = require('path');

const url = require('url');

console.clear();

// ! Blocking, SYNCHRONOUS WAY

/* const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');

console.log(textIn); 

* const textOut = `This is what we know about the avocado: ${textIn}. \n
Created on ${Date.now()}`;

*  fs.writeFileSync('./starter/txt/output.txt', textOut);
const text2 = fs.readFileSync('./starter/txt/output.txt', 'utf-8');
console.log(text2); */

// * Non-Blocking, ASYNCHRONOUS WAY

/*  fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1)=>{

   * fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2)=>{
        console.log(data2);
        fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3)=>{
            fs.writeFile('.starter/txt/final.txt', `${data2}\n${data3}`,'utf-8', err =>{
                console.log('File has been written');
            })
        });
    });
    
}); */

// ? SERVER FUNCTIONS //

const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  'utf-8'
);

//PARSEAMOS EL JSON a UN STRING
// const dataObject = JSON.parse(data);

// ! Create the server

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/overview' || pathName === '/') {
    res.write('Welcome to the OVERVIEW');
  } else if (pathName === '/product') {
    res.write('Welcome to the PRODUCT');
  } else if (pathName === '/api') {
    // LEER EL JSON FILE
    // res.write('API');
    /*

    */
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    //Data Recibida por parte del file, y escrita en la pagina.
    res.write(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html', // ? Podemos especificar el tipo de contenido que vamos a enviar
    });

    res.write('<h1>Page not found!</h1>');
  }

  res.end();
});

// ? Escuchamos el server

server.listen(4000, '127.0.0.1', () => {
  console.log('Listening from the port1');
});

// ? ROUTING //
