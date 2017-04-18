var myCache = require('../cache')
var request = require('request')
var parser = require('xml2json')
var async = require('async')
require ('dotenv').config()

function fetchAllOdds(cb) {
var races = myCache.cache.get(myCache.cacheKeys.ALLRACES)

	async.each(races, function(race, callback) {
		fetchOdds(race.RaceNum, callback)
	}, function(err) {
    if( err ) {
      console.log('Failed to get a race odds.')
      cb(err)
    } else {
      console.log('All race odds have been processed successfully.')
      cb()
    }
	});
}

function fetchOdds(id, callback) {

	var duration = parseInt(process.env.ODDS_CACHE_DURATION) || 60000
	var url = process.env.ODDS_API_URL.replace(/%\w+%/, id)

	request({
		url: url,
		json: false},
		function (error, response, body) {

		  if (!error && response.statusCode == 200) {

		  	var result = parser.toJson(body, {object:true})

		  	var cacheId = myCache.cacheKeys.ODDS + id

				if (process.env.ENVIRONMENT=='prod') {
					myCache.cache.put(cacheId, result, duration, function (key, value) {
			    		console.log(key + ' removed.')
			    		fetchOdds(id)
			    })
				} else { //if we're in non-prod, don't expire the cache
					 myCache.cache.put(cacheId, result)
				}

		    console.log(cacheId, 'updated.')
		    callback(null)

		  } else if (error) {
		  	console.log('Error fetching results. ' + error)
		  	callback(error)
		  } else {
		  	console.log('Error fetching results. ' + response.statusCode)
		  	callback(response.statusCode)
		  }

		  return 1
		})
}

exports.fetchAllOdds = fetchAllOdds
exports.fetchOdds = fetchOdds
