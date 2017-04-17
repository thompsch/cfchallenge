var myCache = require('../cache')
var apiProxy = require('../proxies')

exports.list = function list (req, res, next) {
  var allRaces = myCache.cache.get(myCache.cacheKeys.ALLRACES);
  res.type('json')
  res.send(allRaces)
}

exports.get = function get (req, res, next) {
  var id = req.params.id
  var entry = myCache.cache.get(myCache.cacheKeys.ONEENTRY + id)
  res.type('json')
  res.send(entry)
}