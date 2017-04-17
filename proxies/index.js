var races = require('./races')
var entries = require('./entries')

exports.races = races
exports.entries = entries

exports.fetchAllData = function () {
	races.fetchAllRaces(function(error){
		if (error == null) {
			entries.fetchAllEntries()
		}
	})
}