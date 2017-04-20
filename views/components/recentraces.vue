<template>
<div>
  <div class="panel panel-success">
    <div class="panel-heading"><small><strong>Post Time:</strong> {{ race.postTime }}</small></div>
    <div class="panel-body">
      <table class='table'>
        <thead>
          <th> </th>
          <th>WIN</th>
          <th>PLACE</th>
          <th>SHOW</th>
        </thead>
        <tbody>
          <tr v-for="winner in race.results.WN">
            <td>{{ winner.horse.PostPosition }} - {{ winner.horse.HorseName }}</td>
            <td>{{ winner.WN }}</td>
            <td>{{ winner.PL }}</td>
            <td>{{ winner.SH }}</td>
          </tr>
          <tr v-for="placer in race.results.PL">
            <td>{{ placer.horse.PostPosition }} - {{ placer.horse.HorseName }}</td>
            <td></td>
            <td>{{ placer.PL }}</td>
            <td>{{ placer.SH }}</td>
          </tr>
          <tr v-for="shower in race.results.SH">
            <td>{{ shower.horse.PostPosition }} - {{ shower.horse.HorseName }}</td>
            <td></td>
            <td></td>
            <td>{{ shower.SH }}</td>
          </tr>
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
