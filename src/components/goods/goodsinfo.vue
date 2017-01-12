<template>
    <div class="tmpl">
      <!--1.0 实现商品的轮播图subimgsilder.vue-->
        <sub-img-silder class="subimgsilder" :imagelist="imagelist"></sub-img-silder>
      <!--2.0 实现商品购买区域-->
        <div class="sell">
            <h4>{{goosinfodata.title}}</h4>
            <div class="sellprice">
                市场价:<s>￥{{goosinfodata.sell_price}}</s>   销售价:<span>￥{{goosinfodata.market_price}}</span>
            </div>
            <div class="count">
                购买数量：<sub-number class="subnumber" v-on:count="getcount"></sub-number>
                <!--放数量的组件-->
            </div>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>

        </div>
        <!--3.0 商品参数区域-->
        <div class="params">
            <h6 class="h6">商品参数</h6>
            <ul>
                <li>商品货号:{{goosinfodata.goods_no}}</li>
                <li>库存情况:{{goosinfodata.stock_quantity}}件</li>
                <li>上架时间:{{goosinfodata.add_time | fmtdate('YYYY-MM-DD')}}</li>
            </ul>
        </div>
        <!--4.0 商品的图文信息描述（使用一个新组goosdesc.vue件来完成）-->
        <!--5.0 商品的评论区域 subcomment.vue-->
    </div>
</template>
<style scoped>
   .subimgsilder, .sell,.params{
       border: 1px solid rgba(92,92,92,0.3);
       margin: 5px;
       padding: 5px;
       border-radius:5px;
   }
    /*2.0 商品购买区域*/
   .sell{
       padding-bottom: 20px;
   }
    .sell h4{
        color:#0094ff;
        border-bottom: 1px solid rgba(92,92,92,0.3);
        padding: 10px 0;
    }
   .sell .sellprice s{
       margin-right: 20px;
   }
   .sell .sellprice, .sell .count{
       padding: 10px;
   }
    .sell .sellprice span{
        color:red;
        font-size:18px;
    }
    .subnumber{
        display: inline-block;
    }
   /*2.0 商品购买区域end*/

    /*3.0 商品参数区域*/
    .h6{
        padding: 5px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }
    .params li{
        list-style: none;
    }
   /*3.0 商品参数区域end*/
</style>
<script>
//1.0.1 导入组件subimgsilder.vue
import SubImgSilder from '../subcomp/subimgsilder.vue';
import common from '../../kits/common.js';

//2.0.1 导入subnumber.vue
import SubNumber from '../subcomp/subnumber.vue';


    export default{
        data(){
            return{
                imagelist:[], //1.0.2 这个变量存储的是当前商品的轮播图图片数组
                goosinfodata:{} //2.0.2 这个变量存储的是当前商品的描述信息（包括标题，价格等）
            }
        },
        created(){
            this.getimagelist(); //1.0.4 调用方法
            this.getgoodsinfo();//2.0.3 调用方法
        },
        methods:{
            //1.0.3 定义一个获取轮播图数据的方法
           getimagelist(){
               let id = this.$route.params.id; //获取到商品id
               let url = common.apihost +'/api/getthumimages/'+id;
               this.$http.get(url).then(res=>{
                   //由于api返回的图片地址没有带域名所以要在这里补上
                   res.body.message.forEach(item=>{
                   item.img = common.imghost + item.src;
                    this.imagelist = res.body.message;
               });
               });
           },
            //2.0.2 定义一个方法用来接收子组件传入过来的值
            getcount(count){
                console.log('count='+count);
            },
            //2.0.3 定义个方法用来获取商品的介绍信息
            getgoodsinfo(){
                let id = this.$route.params.id;
                let url =common.apihost+'/api/goods/getinfo/'+id;
                this.$http.get(url).then(res=>{
                    this.goosinfodata = res.body.message[0];
                });
            }
        },
        components:{
            SubImgSilder,
            SubNumber
        }
    }
</script>
