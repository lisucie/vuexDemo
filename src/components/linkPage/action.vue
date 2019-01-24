<template>

	<div class="panel-body" style="padding-bottom:0px;">
        <div class="panel panel-default">
           <div class="panel-heading">查询条件</div>
           <div class="panel-body">
               <form id="formSearch" class="form-horizontal">
                   <div class="form-group row" style="margin-top:15px">
                       <div class="col-lg-4">
                           <label class="control-label" for="txt_search_departmentname">部门名称</label>
                           <input type="text" class="form-control" id="txt_search_departmentname">
                       </div>
                       
                       <div class="col-lg-4">
                           <label class="control-label" for="txt_search_statu">状态</label>
                           <input type="text" class="form-control" id="txt_search_statu">
                       </div>
                       <div class="col-lg-4" style="text-align:left;">
                           <button type="button" style="margin-left:50px" id="btn_query" class="btn btn-primary">查询</button>
                       </div>
                   </div>
               </form>
           </div>
       </div>       

        <div id="toolbar" class="btn-group">
            <button id="btn_add" type="button" class="btn btn-default" @click="addModal()">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
            </button>
            <button id="btn_edit" type="button" class="btn btn-default" @click="okModal()">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
            </button>
            <button id="btn_delete" type="button" class="btn btn-default" @click="messModal()">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
            </button>
        </div>
        <table id="tb_departments"></table>
         <modal></modal>
        
    </div>

</template>

<script>
    import {tablejs} from './table-js/onepage.js'
    import modal from '../commons/modal.vue'
    import {messModal} from '../commons/js/messModal.js'
    import {okModalmess} from '../commons/js/messModal.js'
    import {messModalMess} from '../commons/js/messModal.js'

 import  '../../mock/mock.js'
	export default{
         components:{    //注册组件
             'modal':modal,
         },
		data(){
			return{
				msg:'我是action'
			}
		},
    methods:{
      addModal(){
         $('#addModal').modal();
      },
      okModal(){
         okModalmess()
      },
      messModal(){
        messModalMess()
      }

    },
		beforeCreate: function () {
         
        },
        cteated: function () {
        	
        },
        beforeMount: function () {
        	
        },
        mounted: function () {
          tablejs()
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
	
</style>