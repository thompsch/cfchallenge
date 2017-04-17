<template lang='html'>
  <div>
      <h1>Race {{raceid}}</h1>
      <p>{{entries[raceid]}}</p>
  </div>
</template>

<script>
export default {
   props: ['raceid', 'entries']
}
</script>

<style lang='css'>
</style>
