var myCache = require('../cache')
var request = require('request')
require ('dotenv').config()

function fetchAllRaces() {

	var duration = parseInt(process.env.RACE_CACHE_DURATION) || 60000

	request({
		url: process.env.RACE_API_URL,
		json: true},
		function (error, response, body) {
			var allRaces
		  if (!error && response.statusCode == 200) {
		    allRaces = body

				if (process.env.ENVIRONMENT=='prod') {
		    	myCache.cache.put(myCache.cacheKeys.ALLRACES, allRaces, duration, function (key, value) {
		    		console.log(key + ' removed.')
		    		fetchAllRaces()
					}) 
				} else {
					myCache.cache.put(myCache.cacheKeys.ALLRACES, allRaces)
				}

		    console.log(myCache.cacheKeys.ALLRACES, 'updated.')

				for (var r = 0; r< allRaces.length; r++) {
					var race = allRaces[r]
					myCache.cache.put(myCache.cacheKeys.ONERACE + race.RaceNum, race, duration)
				}

		  } else if (error) {
		  	console.log('Error fetching races. ' + error)
		  } else {
		  	console.log('Error fetching races. ' + response.statusCode)
		  }
		})
}

exports.fetchAllRaces = fetchAllRaces
