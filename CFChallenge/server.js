'use strict'

var fs = require('fs')
var path = require('path')

global.Vue = require('vue')

var NodeCache = require("node-cache")
const myCache = new NodeCache()

//VUE
var layout = fs.readFileSync('./index.html', 'utf8')
var renderer = require('vue-server-renderer').createRenderer()

var express = require('express')
var server = express()

server.use('/assets', express.static(
  path.resolve(__dirname, 'assets')
))

server.get('*', function (request, response) {
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
  if (error) throw error
  console.log('Server is running at localhost:8080')
})
