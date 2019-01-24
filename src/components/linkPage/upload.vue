<template>
	<div>
		<h1 style="text-align:center;">zyUpload示例</h1>
	    <div id="demo" class="demo"></div> 
          <br>
           <img :src="img" alt="">
           <!-- <img src="../commons/images/fileType/file.png" alt="file">
           <img src="../commons/images/fileType/txt.png" alt="txt">
           <img src="../commons/images/fileType/zip.png" alt="zip">
           <img src="../commons/images/fileType/rar.png" alt="rar"> -->
	</div>
</template>

<script>
     import {zyupload} from './table-js/zyUpload.js'
     import {demo} from './table-js/demo.js'

     import imgOne from '../commons/images/fileType/file.png'


	export default{

		data(){
			return {
				msg:'我要上传文件',
                img:imgOne
			}
		},
        methods:{
            a:function(){
               console.log(img)
            }
        },
		    beforeCreate: function () {
      
        },
        cteated: function () {
        	
        },
        beforeMount: function () {
        	
        },
        mounted: function () {
        	
        	zyupload();
        	demo();
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
  @import '../commons/css/zyUpload.css';
	
</style>