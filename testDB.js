const { db, } = require('./pgp')
const fs = require('fs')

console.log('abc');
db.none('SELECT * from product limit 3')
  .then((data) => {
    // success;
    // console.log(data);
    let a = JSON.stringify(data)
    // console.log(a);

  })
  .catch(error => {
    // error;
  });


db.query('SELECT * from product')
  .then((data) => {
    // success;
    // console.log(data);
    let a = JSON.stringify(data)
    fs.writeFile('data.json',a)

  })
  .catch(error => {
    // error;
  });