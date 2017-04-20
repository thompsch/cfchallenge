<template lang='html'>
  <div class="panel panel-success">
    <div class="panel-heading"><small><strong>Post Time:</strong> {{ race.postTime }}</small></div>
      <div class="panel-body">
        <table class='table'>
          <thead>
            <th>Position</th>
            <th>Horse name</th>
            <th>Jockey</th>
            <th>Trainer</th>
            <th>etc...</th>
          </thead>
          <tbody>
            <tr v-for="entry in race.entries">
              <td>{{ entry.PostPosition }}</td>
              <td>{{ entry.HorseName }}</td>
              <td>{{ entry.Jockey }}</td>
              <td>{{ entry.Trainer }}</td>
              <td>lots of other data we could show...</td>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default {
   props: ['race']
}
</script>
