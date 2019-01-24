<template>
	<div class="box">
		<table border="1">
			<thead>
				<tbody>
					<th v-for='el in arrT'>
						<td v-text='el.name'></td>
						<td v-text='el.age'></td>
						<td v-text='el.bm'></td>
						<td v-text='el.bm1'></td>
					</th>
				</tbody>
			</thead>
		</table>
	</div>
</template>

<script>
	export default{
      data(){
      	return{
           arrT:[]
      }
     },
      methods:{
            getT(){
            	this.axios.get('http//test123.com').then((res) => {//这里post和get都行
                    console.log(res)
                       this.arrT=res  
                    //输出结果：{ "name": "李秀英", "age": 7 } 
                //结果是随机的，也有可能是其他值

                });
            }
      },
      mounted:function(){
      	 this.getT()
      }
	}
</script>

<style>
	.box{
		color:white;
	}
</style>