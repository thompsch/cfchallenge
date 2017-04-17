<template lang="html">
    <div class='container'>
        <h1>{{title}}</h1>
        <p>Tote Board for C.F. Downs</p>
        <races :races="races" :entries="entries"></races>
    </div>
</template>

<script>

export default {
    data: function() {
        return {
        }
    }
}
</script>

<style lang="css">
</style>
