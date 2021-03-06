var myCache = require('../cache')
var request = require('request')
var parser = require('xml2json')
var async = require('async')
require ('dotenv').config()

function fetchAllResults(cb) {

	var races = myCache.cache.get(myCache.cacheKeys.ALLRACES)

	async.each(races, function(race, callback) {
		console.log('trying to get results for race', race.RaceNum)
		fetchResult(race.RaceNum, callback)
	}, function(err) {
    if (err) {
      console.log('Failed to get a race result.')
      cb(err)
    } else {
      console.log('All race results have been processed successfully.')
      cb()
    }
	});

}

function fetchResult(id, callback) {

	var duration = parseInt(process.env.RESULT_CACHE_DURATION) || 60000
	var url = process.env.RESULTS_API_URL.replace(/%\w+%/, id)

	request({
		url: url,
		json: false},
		function (error, response, body) {

		  if (!error && response.statusCode == 200) {

		  	var result = parser.toJson(body, {object:true})

				//for each result, format as $x.xx
				if (result.ResultsResponse.Entries.Entry) {

						for (var e =0; e < result.ResultsResponse.Entries.Entry.length; e++) {

							if (!Array.isArray(result.ResultsResponse.Entries.Entry[e].Pools.Pool)) {

								var v = parseFloat(result.ResultsResponse.Entries.Entry[e].Pools.Pool.Value)
								result.ResultsResponse.Entries.Entry[e].Pools.Pool.Value =  '$' + v.toFixed(2)
							} else {

								for (var p = 0; p < result.ResultsResponse.Entries.Entry[e].Pools.Pool.length; p ++) {

									if (result.ResultsResponse.Entries.Entry[e].Pools.Pool[p].Value) {
										var v = parseFloat(result.ResultsResponse.Entries.Entry[e].Pools.Pool[p].Value)
										result.ResultsResponse.Entries.Entry[e].Pools.Pool[p].Value = '$' + v.toFixed(2)

									}
							}
						}
					}
				}

		  	var cacheId = myCache.cacheKeys.ONERESULT + id

				if (process.env.ENVIRONMENT=='prod') {
					myCache.cache.put(cacheId, result, duration, function (key, value) {
			    		console.log(key + ' removed.')
			    		fetchResult(id)
			    })
				} else { //if we're in non-prod, don't expire the cache
					 myCache.cache.put(cacheId, result)
				}

		    console.log(cacheId, 'updated.')
		    callback (null)
		  } else if (error) {
		  	console.log('Error fetching results. ' + error)
		  	callback(error)
		  } else {
		  	console.log('Error fetching results. statusCode:' + response.statusCode)
		  	callback(response.statusCode)
		  }

		})
}

exports.fetchAllResults = fetchAllResults
