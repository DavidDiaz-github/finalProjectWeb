module.exports = app => {

  // Base URLS
  app.use('/api', require('./movies.routes.js'))
  app.use('/api', require('./auth.routes.js'))
  app.use('/api', require('./coment.routes.js'))
}
