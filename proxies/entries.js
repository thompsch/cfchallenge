var myCache = require('../cache')
var request = require('request')
require ('dotenv').config()


function fetchAllEntries() {

	var allRaces = myCache.cache.get(myCache.cacheKeys.ALLRACES)
	for (var r = 0; r < allRaces.length; r++) {
		fetchEntry(allRaces[r].RaceNum)
	}
}

function fetchEntry(id) {

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

		  } else if (error) {
		  	console.log('Error fetching entry. ' + error)
		  } else {
		  	console.log('Error fetching entry. ' + response.statusCode)
		  }
		})
}

exports.fetchAllEntries = fetchAllEntries
exports.fetchEntry = fetchEntry
