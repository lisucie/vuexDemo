<template>
	<div>
		<!-- 弹出层(确定，取消) -->
		<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
         <div class="modal-dialog" role="document">
             <div class="modal-content">
                 <div class="modal-header">
                      <span class="modal-title" id="myModalLabel">新增</span>

                     <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                 </div>
                 <div class="modal-body">
 
                     <div class="form-group">
                        <label for="txt_departmentname">部门名称</label>
                        <input type="text" name="txt_departmentname" class="form-control" id="txt_departmentname" placeholder="部门名称">
                     </div>
                     <div class="form-group">
                        <label for="txt_parentdepartment">上级部门</label>                         <input type="text" name="txt_parentdepartment" class="form-control" id="txt_parentdepartment" placeholder="上级部门">
                     </div>
                     <div class="form-group">
                         <label for="txt_departmentlevel">部门级别</label>
                         <input type="text" name="txt_departmentlevel" class="form-control" id="txt_departmentlevel" placeholder="部门级别">
                     </div>
                     <div class="form-group">
                         <label for="txt_statu">描述</label>
                         <input type="text" name="txt_statu" class="form-control" id="txt_statu" placeholder="状态">
                     </div>
                 </div>
                 <div class="modal-footer">
                     <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>关闭</button>
                     <button type="button" id="btn_submit" class="btn btn-primary" data-dismiss="modal"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>保存</button>
                 </div>
             </div>
         </div>
     </div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				msg:'我是弹框'
			}
		},
        method:{

        },
       
	}
</script>

<style>
	
</style>