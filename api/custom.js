var myCache = require('../cache')
var apiProxy = require('../proxies')

exports.get = function get (req, res, next) {
  var cre = myCache.cache.get(myCache.cacheKeys.CUSTOM)
  res.type('json')
  res.send(cre)
}
