var races = require('./races')
var entries = require('./entries')

exports.races = races
exports.entries = entries

exports.fetchAllData = function() {
	races.fetchAllRaces()
	entries.fetchEntry(1)
	//todo: fetchAllEntries
}