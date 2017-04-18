var myCache = require('../cache')
var request = require('request')
var async = require('async')
require ('dotenv').config()


function fetchAllEntries(cb) {
	
	var races = myCache.cache.get(myCache.cacheKeys.ALLRACES)

	async.each(races, function(race, callback) {
		fetchEntry(race.RaceNum, callback)
	}, function(err) {
    if( err ) {
      console.log('Failed to get a race entry.')
      cb(err)
    } else {
      console.log('All race entries have been processed successfully.')
      cb()
    }
	});
}

function fetchEntry(id, callback) {

	var duration = parseInt(process.env.ENTRY_CACHE_DURATION) || 60000
	var url = process.env.ENTRIES_API_URL.replace(/%\w+%/, id)

	request({
		url: url,
		json: true},
		function (error, response, body) {

		  if (!error && response.statusCode == 200) {

		  	var entry = body
		  	var cacheId = myCache.cacheKeys.ONEENTRY + id

				//cache duration only if in prod
				if (process.env.ENVIRONMENT=='prod') {
					myCache.cache.put(cacheId, entry, duration, function (key, value) {
			    		console.log(key + ' removed.')
			    		fetchEntry(id)
			    })
				} else {
					 myCache.cache.put(cacheId, entry)
				}

		    console.log(cacheId, 'updated.')
		    callback(null)
		  } else if (error) {
		  	console.log('Error fetching entry. ' + error)
		  	callback(error)
		  } else {
		  	console.log('Error fetching entry. ' + response.statusCode)
		  	callback(response.statusCode)
		  }
		  return 1
		})
}

exports.fetchAllEntries = fetchAllEntries
exports.fetchEntry = fetchEntry
