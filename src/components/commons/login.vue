<template>
	<div class="login" v-show="loginShow">


		 <button class="btn btn-default" @click="btnHide">确定</button>
	</div>

    
</template>

<script>
	import {mapGetters} from 'vuex'
	export default{
		computed:{
      	...mapGetters(['bshow']),    //这里拿到vuex里存储的布尔值状态

         ...mapGetters(['loginShow']) 
	     },
         data(){
            return{
            	falg:false
            }
         },
        
		methods:{
				btnHide(){
					return this.$store.dispatch('btnHide')
				}
			}
		
	}
</script>

<style>
	.login{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		z-index:10000;
		background:white;
	}
</style>