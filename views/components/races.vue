<template lang='html'>
<div class='container'>
  <div class='row'>
			<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" >
							<a href='#active' role="tab" data-toggle="tab">Active Races</a>
					</li>
					<li role="presentation" >
							<a href='#upcoming' role="tab" data-toggle="tab">Upcoming Races</a>
					</li>
					<li role="presentation" >
							<a href='#recent' role="tab" data-toggle="tab">Recent Races</a>
					</li>
			</ul>
	</div>
	<div class='row'>
		<div class="tab-content">
			 <div role="tabpanel" class="tab-pane active" id='active'>
         <div class='row'>
           <ul class="nav nav-tabs" role="tablist">
               <li v-for='race in this.races.activeRaces' role="presentation" >
                   <a v-bind:href="'#race-' + race.id" role="tab" data-toggle="tab">{{ race.id }}</a>
               </li>
           </ul>
       </div>
       <div class='row'>
         <div class="tab-content">
            <div v-for='race in this.races.activeRaces' role="tabpanel" class="tab-pane" :id="'race-' + race.id">
              <activeraces v-bind:race="race"></activeraces>
            </div>
          </div>
        </div>
      </div> <!--end activeRaces-->
      <div role="tabpanel" class="tab-pane" id='upcoming'>
        <div class='row'>
          <ul class="nav nav-tabs" role="tablist">
              <li v-for='race in this.races.upcomingRaces' role="presentation" >
                  <a v-bind:href="'#race-' + race.id" role="tab" data-toggle="tab">{{ race.id }}</a>
              </li>
          </ul>
      </div>
      <div class='row'>
        <div class="tab-content">
           <div v-for='race in this.races.upcomingRaces' role="tabpanel" class="tab-pane" :id="'race-' + race.id">

           </div>
         </div>
       </div>
     </div> <!--end upcomingRaces-->
     <div role="tabpanel" class="tab-pane" id='recent'>
        <div class='row'>
          <ul class="nav nav-tabs" role="tablist">
              <li v-for='race in this.races.recentRaces' role="presentation" >
                  <a v-bind:href="'#race-' + race.id" role="tab" data-toggle="tab">{{ race.id }}</a>
              </li>
          </ul>
      </div>
      <div class='row'>
        <div class="tab-content">
           <div v-for='race in this.races.recentRaces' role="tabpanel" class="tab-pane" :id="'race-' + race.id">
              <recentraces v-bind:race="race"></recentraces>
           </div>
         </div>
       </div>
     </div> <!--end recentRaces-->
    </div>
  </div> <!--end row-->
</div> <!-- end container-->

</template>

<script>
export default {
    props: ['emptyRaces', 'races'],
    methods: {
    },
    mounted: function() {
      this.$nextTick(function () {

        console.log('mounted')
      //  var tempArr = [{}] //hack - gets around races not being 0-based
        this.$http.get('/api/custom').then(response => {
          this.races = response.body
          console.log(this.races)
        }, response => {
          console.log('Error getting Custom object')
        });
      })


    }
}
</script>
