#POSTGRES DEMO

### Kết nối database
* Bước 1: Tạo thư mục config chứa file config.json chứa thông tin liên kết tới database như name, port, user...
```js
  // Bước 1 tạo file config
{
  "development": {
    "username": "postgres",
    "password": "123",
    "database": "mybase",
    "host"    : "localhost",
    "port"    : 5432,
    "dialect" : "postgres",
    "schema"  : "public",
    "logging" : false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host"    : "payroll",
    "dialect" : "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host"    : "127.0.0.1",
    "dialect" : "postgres"
  }
}
```

```js
/** 
  Ở config trên mặc định dùng devolopment 
    test để kiểm tra 
    production để kiểm tra khi hoàn thành sản phẩm
  */
  const env = process.env.NODE_ENV || "development";
  const config = require(path.join(__dirname, 'config', 'config.json'))[env];

```
* Bước2: Sử dụng module **bluebird** để ghi đề thuộc tính initOptiol của **pgq-promise**[http://vitaly-t.github.io/pg-promise/module-pg-promise.html]()http://vitaly-t.github.io/pg-promise/module-pg-promise.html
```js
const Promise = require('bluebird');
const options = {
    promiseLib: Promise
};
const pgp = require('pg-promise')(options);
```
* Cài đặt địa chỉ cho pgq --> có thể là chuỗi string hoặc một object
```js
const cn = 'postgres://username:password@host:port/database';
const cn = {
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.username,
  password: config.password
};
module.exports.db = pgp(cn);
module.exports.config = config
```
* Xong phần kết nối, sử dụng chỉ cần require('./pgg)
* Sử dụng thêm module monitor quan sát khi có lỗi

```js
// Khi có lỗi phải bật monitor để quan sát câu lệnh SQL
//monitor.attach(options);
monitor.setTheme('bright');

```

### Các câu lệnh kết nối đơn giản
#### Lệnh select 
```js
db.any('select * from table_name limit 3')
.then(data => {
  console.log(data)
})
.catch( err => {
  console.log(err)
})
// có thể thay dấu toán tử = || > || != || <>...
db.any('select * from table_name where col_ = $1', [value])
.then(data => {
  console.log(data)
})
.catch( err => {
  console.log(err)
})

// Truy vấn một đối tượng đặt biến trong dấu ${tên biến} theo ES6
db.any('SELECT * FROM table_name WHERE name_product = ${name} AND quanlity = ${quanlity}',
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
// Truy vấn tương tự khi có nhiều thuộc tính 
db.any('select * from table_name where quanlity > $1 and price >$2', [1000, 200000] )
.then(data => {
  console.log(data);
  console.log('--------------------------');
})

.catch(err => {
  console.log(err);
})

```

* Thêm và xoá một records( đối tượng)  trong bảng

```js
// với none không trả về kết quả trong returning
// * trả về toàn bộ đối tượng
// tên thuộc tính trả về thuộc tính cần
db.one('insert into product (name_product, quanlity, price, status) values ($1, $2, $3, $4) returning * ', ['new product', 1 , 222, 1] )
.then(data => {
  console.log(data);
})
.catch(err => {
  console.log(err);
})
// Xoá một đối tượng
// result.rowCount đếm đối tượng xoá
db.result("delete from product where quanlity = $1", [1])
.then(result => {
  console.log(result.rowCount);
  console.log(result.rowAsArray);
})
.catch(err => {
  console.log(err);
})

```

