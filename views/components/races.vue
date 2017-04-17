<template lang='html'>
<div class='container'>
  <div class='row'>
      <ul class="nav nav-tabs" role="tablist">
          <li v-for='race in races' role="presentation" >
              <a v-bind:href="'#race-' + race.RaceNum" v-bind:aria-controls="'race-' + race.RaceNum" role="tab" data-toggle="tab">{{ race.RaceNum }}</a>
          </li>
      </ul>
  </div>
  <div class='row'>
    <div class="tab-content">
        <div v-for='race in races' role="tabpanel" class="tab-pane" :id="'race-' + race.RaceNum">
            <entries v-bind:raceid="race.RaceNum" v-bind:entries="entries"></entries>
        </div>
      </div>
  </div>
</div>
</template>

<script>

export default {
    props: ['races', 'entries'],
    methods: {
        getEntries: function() {
          var tempArr = [{}] //hack - gets around races not being 0-based

          for (var r=0; r < this.races.length; r++) {
            this.$http.get('/api/entry/' + this.races[r].RaceNum).then(response => {
             tempArr.splice(r, 1, response.body)
              }, response => {
                console.log('Error getting Entry')
              });
          }
          this.entries = tempArr
        }
    },
    mounted: function() {
      this.$nextTick(function () {
          this.$http.get('/api/races').then(response => {
            this.races = response.body
            this.getEntries()
          }, response => {
            console.log('Error getting Races')
          });
      })
    }
}
</script>

<style lang='css'>
</style>
