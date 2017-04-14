(function () {
  'use strict'
  var createApp = function () {
  
    return new Vue({
            template: '<div id="app">Here are the current races: {{ races }} </div > ',
      data: {
          counter: 0,
          races: {
              "RaceNum": 1,
              "PostTime": "2017-04-17T16:20:00Z"
          }
      },
      created: function () {
       /* var vm = this
        setInterval(function () {
          vm.counter += 1
        }, 1000)*/
      }
    })
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = createApp
  } else {
    this.app = createApp()
  }
}).call(this)
