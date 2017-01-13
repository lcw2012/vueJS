<template>
	<div class="tmpl">
		<div class="row">
			<div class="leftdiv">
				<mt-switch class="switch" v-model="value"></mt-switch>
			</div>
			<div class="centerdiv">
				<img width="75" height="75" src="http://ofv795nmp.bkt.clouddn.com//upload/201504/20/thumb_201504200046589514.jpg" alt="">
			</div>
			<div class="rightdiv">
				<h4>标题</h4>
				<span>￥2333</span>
				<subnumber class="subnumber" v-on:count="getcount"></subnumber>
				<a href="#">删除</a>
			</div>
		</div>

	</div>
</template>

<style scoped>
	.row{
		display: flex;
		margin-top: 5px;
		border-bottom: 1px solid rgba(1,1,1,0.3);
		padding: 5px;
	}
	.row .leftdiv{
		flex: 0 0 20px;
	}
	.switch{
		margin-top: 20px;
	}
	.row .centerdiv{
		flex: 0 0 75px;
	}
	.row .rightdiv{
		flex: 1;
	}
	.row .rightdiv h4{
		color:#0094ff;
		padding: 5px 0;
	}
	.row .rightdiv .subnumber{
		display: inline;
		margin: 0 10px;
	}

	.row .rightdiv span{
		color:red;
		font-size: 16px;
	}


</style>

<script>
	import subnumber from '../subcomp/subnumber.vue'
export default{
	data(){
		return {
			value:false
		}
	},
	methods:{
		//获取到数量选择组件中的数值
		getcount(count){

		}
	},
	components:{
		subnumber
	}
}
	
</script>

