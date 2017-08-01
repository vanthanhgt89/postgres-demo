const { db, } = require('./pgp')
const fs = require('fs')

console.log('abc');
// db.none('SELECT * from product limit 3')
//   .then((data) => {
//     // success;
//     // console.log(data);
//     let a = JSON.stringify(data)
//     // console.log(a);

//   })
//   .catch(error => {
//     // error;
//   });
// db.any('select * from product where quanlity = $1', [1])
// db.any('select * from product where quanlity = $1', [140]) // Tim trong cot product gia tri 140
// .then(data => {
//   console.log(data);
// })
// .catch(err => {
//   console.log(err);
// })

// Returning tra ve record vua them vao trong bang
// chon * tra ve toan bo doi tuong
// chon ten thuoc tinh tra ve thuoc tinh
// chon db.none khong tra ve ket qua

db.one('insert into product (name_product, quanlity, price, status) values ($1, $2, $3, $4) returning * ', ['new product', 1 , 222, 1] )
.then(data => {
  console.log(data);
})
.catch(err => {
  console.log(err);
})
// db.query('SELECT * from product')
//   .then((data) => {
//     // success;
//     // console.log(data);
//     let a = JSON.stringify(data)
//     fs.writeFile('data.json',a)

//   })
//   .catch(error => {
//     // error;
//   });


// db.func('check', [140, new Date()])
// .then(data => {
//   console.log(data);
// })
// .catch(err => {
//   console.log(err);
// })


// const check = (re)



// db.any({
//   text: 'SELECT * FROM product WHERE quanlity = $1', // can also be a QueryFile object
//   values: [140]
// })
//   .then(user => {
//     console.log(user);
//     // user found;
//   })
//   .catch(error => {
//     // error;    
//   });

db.result("delete from product where quanlity = $1", [1])
.then(result => {
  console.log(result.rowCount);
  console.log(result.rowAsArray);
})
.catch(err => {
  console.log(err);
})

// db.result("select quanlity  from product where quanlity > $1", [140])
// .then(result => {
//   console.log(result.rowCount);
//   // console.log(result.rows);
//   console.log(result);
// })
// .catch(err => {
//   console.log(err);
// })

db.any('select * from product where quanlity > $1 and price >$2', [1000, 200000] )
.then(data => {
  console.log(data);
  console.log('--------------------------');
})

.catch(err => {
  console.log(err);
})

db.any('SELECT * FROM product WHERE name_product = ${name} AND quanlity = ${quanlity}',
  {
    name: 'sp A',
    quanlity: 1000
  })
  .then(data => {
    console.log('DATA:', data); // print data;
  })
  .catch(error => {
    console.log('ERROR:', error); // print the error;
  });


