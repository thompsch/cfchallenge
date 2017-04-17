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

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

app.use(express.static(path.join(__dirname, 'assets')))

//APIs
app.get('/api/races', apis.races.list)
app.get('/api/races/:id', apis.races.get)
app.get('/api/entry/:id', apis.entries.get)

var pageTitle = 'CF Tote Test';

app.get('/', function(req, res){
    var scope = {
        data: {
            title: pageTitle,
            races: [],
            entries: []
        },
        vue: {
            head: {
                title: pageTitle,
            },
            components: ['races', 'entries']
          }
    }

    res.render('index', scope);
});

app.listen(8080, function (error) {

  //fetch all data on start
  var proxies = require('./proxies')
  proxies.fetchAllData()

  if (error) throw error
  console.log('Server is running at localhost:8080')
})
