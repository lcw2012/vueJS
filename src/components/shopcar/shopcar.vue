<template>
	<div class="tmpl">
		<div class="row" v-for="item in shopcarlist">
			<div class="leftdiv">
				<mt-switch class="switch" v-model="value"></mt-switch>
			</div>
			<div class="centerdiv">
				<img width="75" height="75" :src="item.thumb_path" alt="">
			</div>
			<div class="rightdiv">
				<h4>{{item.title}}</h4>
				<span>￥{{item.sell_price}}</span>
				<subnumber :initcount="item.count" class="subnumber" v-on:count="getcount"></subnumber>
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
	import subnumber from '../subcomp/subnumber.vue';
	import {getItem} from '../../kits/localStorageHelper.js'
	import common from '../../kits/common.js';
export default{
	data(){
		return {
			value:false,
			shopcarlist :[] //用来储存购物车中的商品
		}
	},
	created(){
		this.initPageData();
	},
	methods:{
		//获取到数量选择组件中的数值
		getcount(count){

		},
		//根据商品id获取商品数据
		initPageData(){
			//1.0 从localStorage中获取所有的商品id
			// arr的数据格式： [{goodsid:1,count:1},{goodsid:1,count:2}{},{}]
			let arr = getItem();
			let goodsObj = {}; //负责将goodsid的值当做属性名称，count值当做属性值
			arr.forEach(item=>{
				if(goodsObj[item.goodsid]){
					//存在，则将count追加上去
					let tmpcount = 	goodsObj[item.goodsid];
					tmpcount+=item.count;
					goodsObj[item.goodsid] = tmpcount;
				}else{
					//如果不存在则直接设置count上去
					goodsObj[item.goodsid] = item.count;
				}
			});

			//1.0.1 将goodsObj中的属性名称拿出来
			let idarr = [];
			for(let goodsidvalue in goodsObj){
				idarr.push(goodsidvalue);
			}
			let ids = idarr.join(',');

			//2.0 请求api获取数据
			let url = common.apihost+'/api/goods/getshopcarlist/'+ids;
			this.$http.get(url).then(res=>{
//
				// 应该将thumb_path属性的图片字符串加上域名前缀
			res.body.message.forEach(item=>{
				item.thumb_path = common.imghost + item.thumb_path;
				item.count = goodsObj[item.id]; //
			});
				this.shopcarlist = res.body.message;
			});
		}
	},
	components:{
		subnumber
	}
}
	
</script>

