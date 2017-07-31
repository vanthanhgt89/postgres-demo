const express = require('express')
const path = require('path')
const app = express()


//--------Serve static resource -------------

app.use('/public', express.static('public'))
app.set('views', path.join(__dirname), 'views')

//---------View Template Engine -------------
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  cache: false,
  express: app,
  watch: true
})
app.engine('html', nunjucks.render)
app.set('view engine', 'html')

//--------Body Parser ----------------------
const bodyParser = require("body-parser")
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true  //value of parameter can be any type https://expressjs.com/en/resources/middleware/body-parser.html
}))
app.use(bodyParser.json())

// --------- multer upload ---------
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    return cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) =>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    return cb(null, true)
  }else {
    cb (new Error(file.mimetype + 'is not accepted'))
  }
}

// app.upload = multer({storage: storage, fileFilter: fileFilter}).single('photo')
app.upload1 = multer({storage: storage, fileFilter: fileFilter}).array('photos')



// -------- router ---------

app.get('/', (req, res) => {
  res.render('upload')
})

// app.post('/uploaded', app.upload ,(req, res) =>{
//   console.log(req.file);
//   console.log(req.body);
//   let url =  req.file.path
//   console.log(url);
//   res.render('uploaded', {data: url })
// })
app.post('/uploaded', app.upload1 ,(req, res) =>{
  // console.log(req.files);
  // console.log(req.body);
  var arr = req.files
  let url =  []
  // lay key doi tuong
  // for (var key in object) {
  //  console.log(key);
  // }

  // lay value doi tuong
  for (var value of req.files) {
    console.log(value);
    url.push(value.path)
    
  }
  console.log(url);
  res.render('uploaded', {data: url })
})

app.listen(3000, () => {
  console.log('Listen 3000');
})

//------------Error Handling Middleware----------
app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Error: ' + err.message)
})