const fs = require('fs');

const http = require('http');
const path = require('path');

const url = require('url');

const replaceTemplate = require('./starter/modules/replaceTemplates')

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
const dataObject = JSON.parse(data);


//Cargamos las template UNA VEZ

const tempOverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  'utf-8'
);

const tempProducts = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  'utf-8'
);

const tempCards = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  'utf-8'
);




// ! Funcion para navegar entre las templates

/* const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
  output = output.replace(/{%PRODUCT_FROM%}/g, product.from);
  output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
  output = output.replace(/{%PRODUCT_ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;


} */

// ! Create the server

const server = http.createServer((req, res) => {

  // ! Recibimos el PATH de URL

  const { query, pathname } = url.parse(req.url, true);

  console.log(pathname);
  console.log(query);

  console.log((url.parse(req.url, true)));



  //  OVERVIEW PAGE
  if (pathname === '/overview' || pathname === '/') {

    res.writeHead(200, {
      'Content-type': 'text/html',
    });




    const cardsHTML = dataObject.map(el => replaceTemplate(tempCards, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
    res.write(output);

    // PRODUCT PAGE

  } else if (pathname === '/product') {

    /*Recoremos el objeto con un ARRAY 
    Buscamos el ID */
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProducts, product);



    res.write(output);

    // API PAGE 


  } else if (pathname === '/api') {
    // LEER EL JSON FILE
    // res.write('API');
    /*

    */
    res.writeHead(200, {
      'Content-type': 'application/json',
    });

    // ? Data Recibida por parte del file, y escrita en la pagina.

    res.write(data);

    // PAGE NOT FOUND


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
