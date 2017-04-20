<template>
<div>
  <div>Post Time: {{ race.postTime }}</div>
   <table class='table'>
    <thead>
      <th> </th>
      <th>WIN</th>
      <th>PLACE</th>
      <th>SHOW</th>
    </thead>
    <tbody>
      <tr v-for="winner in race.results.WN">
        <td>{{ winner.horse.PostPosition - winner.horse.HorseName }}</td>
        <td>{{ winner.WN }}</td>
        <td>{{ winner.PL }}</td>
        <td>{{ winner.SH }}</td>
      </tr>
      <tr v-for="placer in race.results.PL">
        <td>{{ winner.horse.PostPosition - winner.horse.HorseName }}</td>
        <td></td>
        <td>{{ placer.PL }}</td>
        <td>{{ placer.SH }}</td>
      </tr>
      <tr v-for="shower in race.results.SH">
        <td>{{ winner.horse.PostPosition - winner.horse.HorseName }}</td>
        <td></td>
        <td></td>
        <td>{{ shower.SH }}</td>
      </tr>
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
