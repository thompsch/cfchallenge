<template lang='html'>
  <div>
    <div class="panel panel-success">
      <div class="panel-heading"><small><strong>Post Time:</strong> {{ race.postTime }}</small></div>
      <div class="panel-body"><span class='h4'>ENTRIES</span>
        <table class='table table-striped table-condensed'>
          <thead>
            <th>Position</th>
            <th>Horse</th>
            <th>Current Odds</th>
          </thead>
          <tbody>
            <tr v-for="entry in race.entries">
              <td>{{ entry.PostPosition }}</td>
              <td><h5>{{ entry.HorseName }}</h5><div class='small'>Ridden by {{ entry.Jockey }}</div><div class='small'>Trained by {{ entry.Trainer }}</div></td>
              <td><div class='oddsBox'> {{ entry.odds }}</div><div class=''>ML {{ entry.ML }}</div></td>
          </tbody>
        </table>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading"><small>Also ran</small></div>
      <div class="panel-body">
      </div>
    </div>
  </div>
</template>

<script>
export default {
   props: ['race']
}
</script>
