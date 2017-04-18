var nodecache = require("memory-cache")

exports.cache = nodecache

exports.cacheKeys = {
    ALLRACES : 'all_races',
    ONERACE : 'race_',
    ONEENTRY : 'entry_',
    ONERESULT : 'results_',
    ODDS : 'odds_',
    CUSTOM : 'cht_'
}