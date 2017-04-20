<template lang='html'>
  <div>
    <div>Post Time: {{ race.postTime }}</div>
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
</template>

<script>
export default {
   props: ['race']
}
</script>
