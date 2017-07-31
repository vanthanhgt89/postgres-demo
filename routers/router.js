


module.exports = (app, express) => {
  const user = require('./user')(express)
  // console.log(user);
  app.use('/', user)
}