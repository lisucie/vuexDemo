<template>
	<div id="aaa">
    <x-chart :id="id" :option="option"></x-chart>
  </div>


</template>

<script>
  import XChart from '../commons/chart.vue'
  import options from '../commons/js/options.js'
	export default{
		 name: 'aaa',
		components:{
			XChart
		},
		data() {
		    let option = options.bar
		    return {
		      id: 'test',
		      option: option
		    }
		  }

	}
</script>

<style>
	#test {
  width: 400px;
  height: 400px;
  margin: 40px auto;
  }
</style>