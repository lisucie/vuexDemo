<template>
	<div>
		<h1 style="text-align:center;">zyUpload示例</h1>
	    <div id="demo" class="demo"></div> 
         <br>
         <img :src="edits" alt="">
	</div>
</template>

<script>
     import {zydemoupload} from './control/js/zyUpload.js'
     import {demotext} from './demo.js'
     import edit from './control/images/fileType/file.png'
	export default{
		data(){
			return {
				msg:'我要上传文件',
                 edits:edit
			}
		},
		beforeCreate: function () {
         
        },
        cteated: function () {
            
        },
        beforeMount: function () {
        	
        },
        mounted: function () {
        	
        	zydemoupload();
        	 demotext();
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
  @import './control/css/zyUpload.css';
	
</style>