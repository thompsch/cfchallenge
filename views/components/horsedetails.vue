<template>
  <div>Horse details will go here...

    {{this.horse}}

  </div>

</template>

<script>
export default {
    props: ['horseid'],
    methods: {
    },
    mounted: function() {
      this.$nextTick(function () {
        console.log()
        this.$http.get('/api/entries/' + this.horseid).then(response => {
          this.horse = response.body
        }, response => {
          console.log('Error getting horse details')
        });
      })
    }
}
</script>
