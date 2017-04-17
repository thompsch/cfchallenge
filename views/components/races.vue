<template lang='html'>
  <div class='row'>
      <ul class="nav nav-tabs" role="tablist">
          <li v-for='race in races' role="presentation">
              <a v-bind:href="'race-' + race.RaceNum" aria-controls="home" role="tab" data-toggle="tab">{{ race.RaceNum }}</a>
          </li>
      </ul>

      <div class="tab-content" v-for='race in races'>
        <div role="tabpanel" class="tab-pane" v-bind:id="'race-' + race.RaceNum">
            <racedetails :racedetails="race.RaceNum">hello</racedetails>
        </div>
      </div>
  </div>
</template>

<script>

export default {
    props: ['title', 'races']
}
</script>

<style lang='css'>
</style>
