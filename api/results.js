var myCache = require('../cache')
var apiProxy = require('../proxies')

exports.get = function get (req, res, next) {
  var id = req.params.id
  var result = myCache.cache.get(myCache.cacheKeys.ONERESULT + id)
  console.log(result)
  res.type('json')
  res.send(result)
}