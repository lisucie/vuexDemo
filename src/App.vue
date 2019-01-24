
<template>

      <div id="wrapper">

       <h-Login></h-Login>
       <left-menu></left-menu>
       <right-content></right-content>

    </div>

</template>
<script>
//引入组件文件
import leftmenu from './components/commons/leftMenu.vue'
import rightcontent from './components/commons/rightContent.vue'
import hLogin from './components/commons/login.vue'

import {onload} from './components/commons/js/clickMe.js'
import {mapGetters} from 'vuex'
	export default {
                                                                                                                                                                                                     
         components:{    //注册组件
         	 'left-menu':leftmenu,
           'right-content':rightcontent,
           'h-Login':hLogin
         },
         methods:{
          
         },
        beforeCreate: function () {
          // alert("我在出生前提示")
        },
        cteated: function () {
          // alert("我出生了")
        },
        beforeMount: function () {
          
        },
        mounted: function () {
          
          onload()
        },
        beforeUpdate: function () {
        },
        updated: function () {
        },
        beforeDestroy: function () {
        },
        destroyed: function () {
        },

	}

</script>
  
<style>
 /* 引入css文件 */
  @import './components/commons/css/style.css';

</style>