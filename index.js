const express = require('express')
const path = require('path')

const app = express()


//--------Serve static resource -------------

app.use('/public', express.static('public'))
app.set('views', path.join(__dirname), 'views')

// console.log(path.join(__dirname), 'views');
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
app.use(bodyParser.urlencoded({
  extended: true  
}))
app.use(bodyParser.json())
// ----------- router ------------

 app.get('/', (req, res) => {
   res.render('home')
 })

const routers = require('./routers/router')
console.log(routers);
routers(app, express)


app.listen(3000, ()=> {
  console.log('listen 3000');
})

