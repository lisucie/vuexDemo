
<template>
     <!-- <div> -->
        <!-- Sidebar -->
        <nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
            <ul class="nav sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">
                       Bootstrap 3
                    </a>
                </li>
                <li >
                   <router-link class="menu" v-bind:to="{name:'main'}"> <i class="fa fa-fw fa-plus"></i>
                      首页
                    </router-link>
                </li>
                <li class="dropdown">
                  <a href="javascript:0" class="dropdown-toggle menu" data-toggle="dropdown"><i class="fa fa-fw fa-plus"></i> {{msgOne}} <span class="caret"></span></a>
                  <ul class="dropdown-menu" role="menu" style="top:0;">
                    <li class="dropdown-header"></li>
                    <li><router-link class="son" v-bind:to="{name:'action'}">Action</router-link></li>
                    <li><router-link class="son" v-bind:to="{name:'another'}">Another action</router-link></li>
                    <li><router-link class="son" v-bind:to="{name:'upload'}">upload</router-link></li>
                    <li><router-link class="son" v-bind:to="{name:'updemo'}">updemo</router-link></li>
                    <li><router-link class="son" v-bind:to="{name:'elemt'}">elemt</router-link></li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle menu" data-toggle="dropdown"><i class="fa fa-fw fa-plus"></i> {{msgTwo}} <span class="caret"></span></a>
                  <ul class="dropdown-menu" data-stopPropagation="true" role="menu" style="top:0;">
                    <li class="dropdown-header"></li>
                    <li><router-link class="son" v-bind:to="{name:'botable'}">botable</router-link></li>
                    <li><a class="son" href="#">Another action</a></li>
                    <li><a class="son" href="#">Something else here</a></li>
                    <li><a class="son" href="#">Separated link</a></li>
                    <li><a class="son" href="#">One more separated link</a></li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle menu" data-toggle="dropdown"><i class="fa fa-fw fa-plus"></i> {{msgThre}} <span class="caret"></span></a>
                  <ul class="dropdown-menu" role="menu" style="top:0;">
                    <li class="dropdown-header">Dropdown heading</li>
                    <li><a class="son" href="#">Action</a></li>
                    <li><a class="son" href="#">Another action</a></li>
                    <li><a class="son" href="#">Something else here</a></li>
                    <li><a class="son" href="#">Separated link</a></li>
                    <li><a class="son" href="#">One more separated link</a></li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle menu" data-toggle="dropdown"><i class="fa fa-fw fa-plus"></i> {{msgFour}} <span class="caret"></span></a>
                  <ul class="dropdown-menu" role="menu" style="top:0;">
                    <li class="dropdown-header">Dropdown heading</li>
                    <li><a class="son" href="#">Action</a></li>
                    <li><a class="son" href="#">Another action</a></li>
                    
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle menu" data-toggle="dropdown"><i class="fa fa-fw fa-plus"></i> {{msgFive}} <span class="caret"></span></a>
                  <ul class="dropdown-menu" role="menu" style="top:0;">
                    <li class="dropdown-header">Dropdown heading</li>
                    <li><a class="son" href="#">Action</a></li>
                    <li><a class="son" href="#">Another action</a></li>
                   
                  </ul>
                </li>
               
            </ul>
        </nav>
        <!-- /#sidebar-wrapper -->
        <!-- </div> -->
</template>

<script>
   import {clickMe} from './js/clickMe.js'
	export default{        //导出
     
	   data(){
        return {
            msgOne:'我是左侧菜单one',
            msgTwo:'我是左侧菜单two',
            msgThre:'我是左侧菜单thre',
            msgFour:'我是左侧菜单four',
            msgFive:'我是左侧菜单five',
            msgSix:'我是左侧菜单six',
            msgSever:'我是左侧菜单sever',
            msgEight:'我是左侧菜单eight'
        }
    },

    methods:{
       
    
    }

    }

  

</script>

<style>
   
</style>