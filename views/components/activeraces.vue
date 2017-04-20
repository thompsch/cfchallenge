<template lang='html'>
  <div>
    <div>Post Time: {{ race.postTime }}</div>
    <table class='table'>
      <thead>
        <th>ENTRIES</th>
        <th>Current Odds</th>
      </thead>
      <tbody>
        <tr v-for="entry in race.entries">

          <td><div class='entryHeader'>{{ entry.PostPosition }} - {{ entry.HorseName }}</div><div class=''>Ridden by {{ entry.Jockey }}</div><div class=''>Trained by {{ entry.Trainer }}</div></td>
          <td><div class='oddsBox'> {{ entry.odds }}</div><div class=''>ML {{ entry.ML }}</div></td>

      </tbody>
    </table>
    <span>Also Ran</span> <span>id - name, id - name, id - name</span>
  </div>
</template>

<script>
export default {
   props: ['race']
}
</script>
