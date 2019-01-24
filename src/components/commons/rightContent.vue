<template>
	
		<div id="page-content-wrapper">
         
          <right-top></right-top>
          
            <div class="container">

                <div class="row">
                    <div class="col-lg-10 col-lg-offset-1">
                         <router-view></router-view>
                    </div>
                </div>
            </div>
        <!-- /#page-content-wrapper -->
	</div>
</template>

<script>
    //引入组件文件
    import rightTop from './rightTop.vue'
     import  '../../mock/mock.js'

	export default{
        components:{    //注册组件
             'right-top':rightTop,
         },
         data(){
            return {
                msg:'我是主页内容'
            }
         },
         methods:{
            getT(){
                console.log('我是个方法')
            } 
         },
         created: function(){
            /*this.axios.get('http//test123.com').then((res) => {//这里post和get都行
                    console.log(res)

                    //输出结果：{ "name": "李秀英", "age": 7 } 
                //结果是随机的，也有可能是其他值

                });*/
            this.getT()
         },
         mounted: function(){
                
             
         }
        
    }
</script>

<style scoped>
	
</style>