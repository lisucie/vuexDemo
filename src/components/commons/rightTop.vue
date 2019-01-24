<template>

		<div>		  

			 <button type="button" class="hamburger is-closed animated fadeInLeft" data-toggle="offcanvas">
            <span class="hamb-top"></span>
            <span class="hamb-middle"></span>
            <span class="hamb-bottom"></span>
          </button>
              

            <div class="top-box">
            	<div class="row">
            		<div class="col-lg-10 col-lg-offset-1 text-right">
            		 <button to="/pass" @click.native="oneShow">修改密码</router-link>  <!-- 弹层  由于父组件header.vue需要改子组件one.vue组件里showOne的值，除了父子组件传递方法外，最好用vuex进行状态管理-->
            		</div>
            	</div>
            </div>

            <hpass></hpass>  <!-- 弹层 -->

		 </div>

</template>

<script>
    import pass from './pass.vue'   //弹层引用

	export default{
        components:{   //弹层注册
   	 	hpass:pass
 	   	},
  
     methods:{
     	oneShow(){
     		return this.$store.dispatch('oneShow')
     	}
     },
	}
</script>

<style scoped>
	.top-box{
		height: 70px;
		line-height: 70px;
		background: red;
	}
</style>