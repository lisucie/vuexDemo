<template>
	<div>

		<button class="btn btn-danger" @click="addModal()">{{modalText}}</button>
		<button class="btn btn-danger" @click="okModal()">{{okText}}</button>
		<button class="btn btn-danger" @click="messModal()">{{okText}}</button>
		<modal></modal>

	</div>

</template>

<script>
    import modal from '../commons/modal.vue'
    import {messModal} from '../commons/js/messModal.js'
    import {okModalmess} from '../commons/js/messModal.js'
    import {messModalMess} from '../commons/js/messModal.js'

	export default{
		components:{    //注册组件
         	 'modal':modal
         },
		data(){
			return {
				modalText:'弹出层',
				okText:'确定取消层',
				messText:'信息提示框'

			}
		},
		methods:{
			addModal(){
				$("#myModalLabel").text("新增");
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
          messModal()
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