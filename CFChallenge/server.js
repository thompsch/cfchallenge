'use strict'

var fs = require('fs')
var path = require('path')
var apis = require('./api')

//CACHE - replace with redis or other for scaling
var cache = require('./cache')

//VUE
global.Vue = require('vue')
var layout = fs.readFileSync('./index.html', 'utf8')
var renderer = require('vue-server-renderer').createRenderer()

var express = require('express')
var server = express()

server.use('/assets', express.static(
  path.resolve(__dirname, 'assets')
))

//APIs
server.get('/api/races', apis.races.list)
server.get('/api/races/:id', apis.races.get)
server.get('/api/entry/:id', apis.entries.get)

server.get('/', function (request, response) {
    //todo: renderToStream
  renderer.renderToString(require('./assets/totes')(),
    function (error, html) {
      if (error) {
        console.error(error)
        return response
          .status(500)
          .send('OHNOZ')
      }
      response.send(layout.replace('<div id="app"></div>', html))
    }
  )
})

server.listen(8080, function (error) {

  //fetch all data on start
  var proxies = require('./proxies')
  proxies.fetchAllData()

  if (error) throw error
  console.log('Server is running at localhost:8080')
})


