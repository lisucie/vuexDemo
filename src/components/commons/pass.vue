<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">	    
    <div class="row pass" v-show="bshow">    <!-- 这里放的是布尔值 -->
     
     <div class="col-lg-12 text-right">
     	<button @click="hideOne">关闭</button>
     </div>
     <!-- <div>{{bshow}}</div> -->
     <div class="col-lg-3 text-center">
     	 dfadsfasdfasd
     </div>
    <div class="col-lg-3 text-center">
     	 dfadsfasdfasd
     </div>
     <div class="col-lg-3 text-center">
     	 dfadsfasdfasd
     </div>
     <div class="col-lg-3 text-center">
     	 dfadsfasdfasd
     </div>
             
    </div>
 </transition>
</template>

<script>
   import {mapGetters} from 'vuex'
	export default{        //导出
      computed:{
      	...mapGetters(['bshow'])    //这里拿到vuex里存储的布尔值状态


	},
	methods:{
		hideOne(){
			return this.$store.dispatch('oneHide')
		}
	}
}

</script>

<style lang="less" scoped>
	.pass{
		position:fixed;
		top:0;
		left:15px;
		width:100%;
		height:100%;
		z-index:10000;
		background:white;
	}
</style>