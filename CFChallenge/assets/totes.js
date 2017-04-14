(function () {
  'use strict'
  var createApp = function () {
  
    return new Vue({
            template: '<div id="app">Here are the current races: {{ races }} </div >',
      data: {
          races: {},
          entry: {}
      },
      created: function () {
        $http.get('/api/races', function(result) {
          this.$set('races', result);
          console.log(this.races)
          //console.log(this.adapterLeft) returns-> [{"text":"BNC Male","value":"BNC Male"},{"text":"SMA Male","value":"SMA Male"}]
          }.bind(this));
      },
     /* ready:function() {
        this.getAllRaces()
        //this.getEntryOne()
      }*/
    })
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = createApp
  } else {
    this.app = createApp()
  }

  
}).call(this)