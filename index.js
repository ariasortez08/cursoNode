const fs = require('fs');
const superAgent = require('superagent');

console.clear();

const readFilePro = (file) => {
  return new Promise((resolve, rejects) => {
    fs.readFile(file, (err, data) => {
      if (err) rejects('File not available');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(file, data, (err) => {
      if (err) rejects('Data cannot be written');
      resolve('Success');
    });
  });
};

// ? EJEMPLO ASYNC AWAIT

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/starter/dog.txt`);
    console.log(`Breed: ${data}`);
    let url = `https://dog.ceo/api/breed/${data}/images/random`;

    const res = await superAgent.get(url);

    await writeFilePro('dog-im.txt', res.body.message);
    console.log('Success');
  } catch (error) {
    console.log('Dog not found!');
  }
};

getDogPic();

// * EJEMPLO DE PROMESA

/* readFilePro(`${__dirname}/starter/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    //   if (err) return console.log(err.message);

    let url = `https://dog.ceo/api/breed/${data}/images/random`;

    return superAgent.get(url);
  })
  .then((res) => {
    return writeFilePro('dog-im.txt', res.body.message);
  })
  .then(() => {
    console.log('Success');
  })
  .catch((err) => {
    console.log(err.message);
  }); */

// fs.readFile(`${__dirname}/starter/dog.txt`, (err, data) => {});
