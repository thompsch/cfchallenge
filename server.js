'use strict'

var fs = require('fs')
var path = require('path')
var apis = require('./api')
var request = require('request')

//CACHE - replace with redis or other for scaling
var cache = require('./cache')

//VUE
global.Vue = require('vue')
var renderer = require('vue-server-renderer').createRenderer()
var resources = require('vue-resource')
Vue.use(resources)

var express = require('express')
var expressVue = require('express-vue')
var app = express()

app.engine('vue', expressVue)
app.set('view engine', 'vue')
app.set('views', path.join(__dirname, '/views'))
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
})

app.use(express.static(path.join(__dirname, 'assets')))

//APIs
app.get('/api/races', apis.races.list)
app.get('/api/races/:id', apis.races.get)
app.get('/api/entries/:id', apis.entries.get)
app.get('/api/results/:id', apis.results.get)
app.get('/api/odds/:id', apis.odds.get)
app.get('/api/custom/', apis.custom.get)

//VUE views



var pageTitle = 'Wutsgotcha Downs'

app.get('/', function(req, res){
    var scope = {
        data: {
            title: pageTitle,
            races: [],
            winner : {}
        },
        vue: {
            head: {
                title: pageTitle,
            },
            components: ['races', 'activeraces', 'recentraces', 'upcomingraces']
          }
    }

    res.render('index', scope)
})

app.get('/horse/:id', function(req, res){
    var scope = {
        data: {
            title: 'Horse details',
            horseid: req.params.id
        },
        vue: {
            head: {
                title: 'Horse details',
            },
            components: ['horsedetails']
          }
    }

    res.render('horseindex', scope)
})


app.listen(8081, function (error) {

  //fetch all data on start
  var proxies = require('./proxies')
  proxies.fetchAllData(function () {
    var myCache = require('./cache')
  })

  if (error) throw error
  console.log('Server is running at localhost:8081')
})
