var races = require('./races')
var entries = require('./entries')
var results = require('./results')
var odds = require('./odds')
var myCache = require('../cache')
var async = require('async')
require ('dotenv').config()

exports.fetchAllData = function (callback) {
	console.log(callback)
	async.waterfall([
	    races.fetchAllRaces,
	    results.fetchAllResults,
	    entries.fetchAllEntries,
	    odds.fetchAllOdds,
			this.buildCustomRaceObject
	], function (err, result) {
		console.log('waterfall done', err, result)
			callback()
	})
}

function buildCustomRaceObject(cb) {

	var duration = parseInt(process.env.CRE_CACHE_DURATION) || 60000
	var customRaceObject = {
		activeRaces : [],
		upcomingRaces : [],
		recentRaces : []
	}

	var allRaces = myCache.cache.get(myCache.cacheKeys.ALLRACES)

	for (var r = 0; r < allRaces.length; r++) {
		var cre = {}
		var race = allRaces[r]

		cre.id = race.RaceNum
		cre.postTime = race.PostTime
		cre.hasResults = false
		cre.hasOdds = false
		cre.hasML = false
		cre.entries = []
		cre.results = {
			WN : [],
			PL : [],
			SH : []
		}

		var oddsLookup = createOddsLookupTable(cre)
		var resultsLookup = createResultsLookupTable(cre)

		var eTemp = myCache.cache.get(myCache.cacheKeys.ONEENTRY + race.RaceNum)
		var entries = eTemp.Entries

		entries.sort(function(a, b) {
	    return a.PostPosition - b.PostPosition;
		})

		for (var e = 0; e < entries.length; e ++) {
			var newEntry = entries[e]

			if (newEntry.ML != null && newEntry.ML != '') cre.hasML = true

			newEntry.odds = oddsLookup[newEntry.ProgramNumber]
			newEntry.result = resultsLookup[newEntry.ProgramNumber]

			if (newEntry.result) {
				cre.hasResults = true

				if (Array.isArray(newEntry.result)) { //WN or PL
					var map = createResultMap(newEntry.result)
					if (map[0] != null) {
						cre.results.WN.push({
							horse : newEntry,
							WN : map[0],
							PL : map[1],
							SH : map[2]
						})
					} else {
						cre.results.PL.push({
							horse : newEntry,
							PL : map[1],
							SH : map[2]
						})
					}
				} else {
					cre.results.SH.push({
						horse : newEntry,
						SH : newEntry.result.Value
					})
				}

			}

			cre.entries.push(newEntry)
		}

		if (cre.hasResults) {
			customRaceObject.recentRaces.push(cre)
		} else if ((cre.hasOdds || cre.hasML) && !cre.hasResults) {
			customRaceObject.activeRaces.push(cre)
		} else if (!cre.hasOdds && !cre.hasResults) {
			customRaceObject.upcomingRaces.push(cre)
		}
	} //end for loop of races

	if (process.env.ENVIRONMENT=='prod') {
		myCache.cache.put(myCache.cacheKeys.CUSTOM, customRaceObject, duration, function (key, value) {
			console.log(key + ' removed.')
			fetchAllData()
		})
	} else {
		myCache.cache.put(myCache.cacheKeys.CUSTOM, customRaceObject)
	}
}

//Create a lookup table for results. Essentially mimicking ".where()"
function createResultsLookupTable(cre) {
	var results = myCache.cache.get(myCache.cacheKeys.ONERESULT + cre.id)
	var tempTable = []
	if(results != null && results.ResultsResponse.Entries != null && results.ResultsResponse.Message == null) {
		//We have results, so this goes in recentRaces
			var rTemp = results.ResultsResponse.Entries.Entry
			for (var r = 0; r < rTemp.length; r ++) {
				var pool = rTemp[r].Pools.Pool
				tempTable[rTemp[r].ProgramNumber] = pool
			}
	}

	return tempTable
}

//Parse the data into an array that we can map easily. Ensure order of array is always WN, PL, SH
function createResultMap(resultArray) {

	var tempObject = []
			for (var r = 0; r < resultArray.length; r ++) {
				var pt =  resultArray[r].PoolType
				switch(pt) {
					case 'WN' :
						tempObject[0] = resultArray[r].Value
						break
					case 'PL' :
						tempObject[1] = resultArray[r].Value
						break
					case 'SH' :
						tempObject[2] = resultArray[r].Value
						break
				}
			}
	return tempObject
}

//Create a lookup table for Odds. Essentially mimicking ".where()"
function createOddsLookupTable(cre) {
	var odds = myCache.cache.get(myCache.cacheKeys.ODDS + cre.id)
	var tempTable = []

	if (odds != null && odds.OddsResponse.WinOdds.Entries != null && odds.OddsResponse.WinOdds.Entries.Entry != null) {
		cre.hasOdds = true
		var eTemp = odds.OddsResponse.WinOdds.Entries.Entry
		for (var odd = 0; odd < eTemp.length; odd ++) {
			tempTable[eTemp[odd].ProgramNumber] = eTemp[odd].TextOdds
		}
	} else {
		cre.hasOdds = false
	}

	return tempTable
}

exports.buildCustomRaceObject = buildCustomRaceObject
