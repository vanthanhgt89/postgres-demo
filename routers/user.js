

let users = [
  {
    name: 'vanthanhgt89@gmail.com',
    password: '123456'
  },
   {
    name: 'vanthanhgt90@gmail.com',
    password: '123456'
  },
]



module.exports = (express) =>{
  const router = express.Router()
    router.get('/', (req, res) => {
      console.log(req.params);
      res.send('hello')
    })

    router.post('/', (req, res) => {
      console.log(req.body.name);
      console.log(req.body.password);
      let name = req.body.name
      let password = req.body.password
      
      for (let user of users) {
        if(user.name === name && user.password === password){
          res.send('ok')
        }else{
          res.send('not found')
        }
      }
     
      
    })
  return router
}

