var assert = require('assert');
var myCache = require('../cache')
var proxies = require('../proxies')
var parser = require('xml2json')

var testRaces = [{RaceNum: 1,PostTime: "2017-04-17T09:45:00-07:00"}, {RaceNum: 8,PostTime: "2017-04-17T23:02:00-07:00"}]
myCache.cache.put(myCache.cacheKeys.ALLRACES, testRaces)

var testOdds = "<OddsResponse><RaceNum>1</RaceNum><MinutesToPost>0</MinutesToPost><WinOdds><Entries><Entry><ProgramNumber>1</ProgramNumber><TextOdds> 8/5</TextOdds></Entry><Entry><ProgramNumber>2</ProgramNumber><TextOdds> 3/1</TextOdds></Entry><Entry><ProgramNumber>3</ProgramNumber><TextOdds> 11/1</TextOdds></Entry><Entry><ProgramNumber>4</ProgramNumber><TextOdds> 24/1</TextOdds></Entry><Entry><ProgramNumber>5</ProgramNumber><TextOdds> 34/1</TextOdds></Entry><Entry><ProgramNumber>6</ProgramNumber><TextOdds> 42/1</TextOdds></Entry><Entry><ProgramNumber>7</ProgramNumber><TextOdds> 5/2</TextOdds></Entry><Entry><ProgramNumber>8</ProgramNumber><TextOdds> 49/1</TextOdds></Entry><Entry><ProgramNumber>9</ProgramNumber><TextOdds> 6/1</TextOdds></Entry></Entries></WinOdds></OddsResponse>"
myCache.cache.put(myCache.cacheKeys.ODDS + "1", parser.toJson(testOdds, {object:true}))

var testEntries = {
RaceNum: 1,
Entries: [
{
ProgramNumber: "1",
PostPosition: 9,
HorseName: "Clever Trevor",
ML: "15/1",
Jockey: "Bradley, Ira J.",
Weight: "119 Lbs",
Trainer: "Childers, Gary",
Medication: "L",
MedWeight: 119,
Sire: "PETIONVILLE",
Dam: "SO EMOTIONAL",
Color: "CH",
Age: 7,
Sex: "G",
BreedingLocation: "KY",
Owner: "FLORENCE M KNIGHT",
ClaimingPrice: 5000
},
{
ProgramNumber: "1A",
PostPosition: 10,
HorseName: "AlwaysABaddy",
ML: "9/2",
Jockey: "15/1",
Weight: "119 Lbs",
Trainer: "Childers, Gary",
Medication: "L",
MedWeight: 119,
Sire: "BADDY DADDY",
Dam: "ALWAYSASTUNNER",
Color: "B",
Age: 8,
Sex: "G",
BreedingLocation: "KY",
Owner: "FLORENCE M KNIGHT",
ClaimingPrice: 5000
},
{
ProgramNumber: "2",
PostPosition: 1,
HorseName: "Sister Mary Sary",
ML: "9/2",
Jockey: "Thomas, Megan D.",
Weight: "119 Lbs",
Trainer: "Lamar L. Walters",
Medication: "L",
MedWeight: 119,
Sire: "LEMON DROP KID",
Dam: "PLEASANT MATE",
Color: "DKBR",
Age: 8,
Sex: "G",
BreedingLocation: "KY",
Owner: "SOCORRO D. LINDNER",
ClaimingPrice: 5000
},
{
ProgramNumber: "3",
PostPosition: 2,
HorseName: "Mr Garde",
ML: "15/1",
Jockey: "Tedesco, Reyna B.",
Weight: "119 Lbs",
Trainer: "Karen K. Brown",
Medication: "L",
MedWeight: 119,
Sire: "JAZIL",
Dam: "SONG OF CONFIDENCE",
Color: "CH",
Age: 5,
Sex: "G",
BreedingLocation: "KY",
Owner: "KAREN BROWN",
ClaimingPrice: 5000
},
{
ProgramNumber: "4",
PostPosition: 3,
HorseName: "Corinthians Secret",
ML: "7/2",
Jockey: "Anderson, Quinton L.",
Weight: "119 Lbs",
Trainer: "Brenda G Smith",
Medication: "L",
MedWeight: 119,
Sire: "CORINTHIAN",
Dam: "DREAM LUCK",
Color: "GR/RO",
Age: 4,
Sex: "G",
BreedingLocation: "IL",
Owner: "Marie V Sandoval",
ClaimingPrice: 5000
},
{
ProgramNumber: "5",
PostPosition: 4,
HorseName: "Aish Tamid",
ML: "10/1",
Jockey: "Elizabeth S. Lucas",
Weight: "119 Lbs",
Trainer: "Margaret R. Baumgardner",
Medication: "L",
MedWeight: 119,
Sire: "PURIM",
Dam: "FIRST LIGHT",
Color: "B",
Age: 5,
Sex: "G",
BreedingLocation: "ON",
Owner: "ERIC T KNAPP",
ClaimingPrice: 5000
},
{
ProgramNumber: "6",
PostPosition: 5,
HorseName: "Chicot Bay",
ML: "15/1",
Jockey: "Williams, Kathryn L.",
Weight: "116 Lbs",
Trainer: "Arias, Frank K.",
Medication: "L",
MedWeight: 116,
Sire: "DOCTOR MIKE",
Dam: "MY SUNSHINE",
Color: "B",
Age: 6,
Sex: "G",
BreedingLocation: "LA",
Owner: "TODD S. ALVARADO",
ClaimingPrice: 0
},
{
ProgramNumber: "7",
PostPosition: 6,
HorseName: "Sunwave",
ML: "8/1",
Jockey: "Adams, Richard A.",
Weight: "116 Lbs",
Trainer: "Banks, Homer T.",
Medication: "L",
MedWeight: 116,
Sire: "SUN KING",
Dam: "HUMBOLDT BELLE",
Color: "CH",
Age: 5,
Sex: "G",
BreedingLocation: "LA",
Owner: "HAGGAMAN &amp; ASSOCIATES, INC",
ClaimingPrice: 5000
},
{
ProgramNumber: "8",
PostPosition: 7,
HorseName: "Calipari's Kitten",
ML: "3/1",
Jockey: "Na, Inez D.",
Weight: "119 Lbs",
Trainer: "Roper, Dorothy G.",
Medication: "L",
MedWeight: 119,
Sire: "KITTEN'S JOY",
Dam: "MISS BERGDORF",
Color: "B",
Age: 7,
Sex: "G",
BreedingLocation: "KY",
Owner: "MARY W. PETERSEN",
ClaimingPrice: 5000
},
{
ProgramNumber: "9",
PostPosition: 8,
HorseName: "Chad Be Glad",
ML: "4/1",
Jockey: "Padroza, Marcelino",
Weight: "116 Lbs",
Trainer: "Gibson, Jonas",
Medication: "L",
MedWeight: 119,
Sire: "GLAD TIDINGS",
Dam: "CHADDES",
Color: "CH",
Age: 7,
Sex: "C",
BreedingLocation: "KY",
Owner: "ROBT B EVANOFF",
ClaimingPrice: 5000
}
]
}
myCache.cache.put(myCache.cacheKeys.ONEENTRY + "1", testEntries)

var testResults = "<ResultsResponse><RaceNum>1</RaceNum><Entries><Entry><ProgramNumber>5</ProgramNumber><Pools><Pool><PoolType>WN</PoolType><Base>1</Base><Value>2.4</Value></Pool><Pool><PoolType>PL</PoolType><Base>1</Base><Value>3.5</Value></Pool><Pool><PoolType>SH</PoolType><Base>1</Base><Value>4.5</Value></Pool></Pools></Entry><Entry><ProgramNumber>2</ProgramNumber><Pools><Pool><PoolType>PL</PoolType><Base>1</Base><Value>5.63</Value></Pool><Pool><PoolType>SH</PoolType><Base>1</Base><Value>4.11</Value></Pool></Pools></Entry><Entry><ProgramNumber>1</ProgramNumber><Pools><Pool><PoolType>SH</PoolType><Base>1</Base><Value>3.45</Value></Pool></Pools></Entry></Entries></ResultsResponse>"

myCache.cache.put(myCache.cacheKeys.ONERESULT + "1", parser.toJson(testResults, {object:true}))

var result = proxies.buildCustomRaceObject()

describe('buildCustomRaceObject()', function() {
	describe('the combined object...', function() {
		it('should have the right id', function() {
			assert.equal('1', result.id)
		})
		it('should have a posttime', function() {
			assert.equal('2017-04-17T09:45:00-07:00', result.postTime)
		})
		it('should have odds', function() {
			assert.equal(true, result.hasOdds)
		})
		it('should have 8 entries', function() {
			assert.equal(10, result.entries.length)
		})
		it('should have complete entries', function() {
			assert.equal('1', result.entries[0].ProgramNumber)
			assert.equal('8/5', result.entries[0].odds)
			assert.deepEqual({ PoolType: 'SH', Base: '1', Value: '3.45' }, result.entries[0].result)
		})
		it('should have a results object', function() {
			assert.deepEqual({ WN: [ 5 ], PL: [ 2 ], SH: [ 1 ] }, result.results)
			assert.equal(5, result.results.WN[0])
			assert.equal(2, result.results.PL[0])
			assert.equal(1, result.results.SH[0])
		})


	})

})
