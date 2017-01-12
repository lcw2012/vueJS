<template>
    <div class="tmpl">
      <!--1.0 实现商品的轮播图subimgsilder.vue-->
        <sub-img-silder class="subimgsilder" :imagelist="imagelist"></sub-img-silder>
      <!--2.0 实现商品购买区域-->
        <!--3.0 商品参数区域-->
        <!--4.0 商品的图文信息描述（使用一个新组goosdesc.vue件来完成）-->
        <!--5.0 商品的评论区域 subcomment.vue-->
    </div>
</template>
<style scoped>
   .subimgsilder{
       border: 1px solid rgba(92,92,92,0.3);
       margin: 5px;
       padding: 5px;
   }
</style>
<script>
//1.0.1 导入组件subimgsilder.vue
import SubImgSilder from '../subcomp/subimgsilder.vue';
import common from '../../kits/common.js';

    export default{
        data(){
            return{
                imagelist:[] //1.0.2 这个变量存储的是当前商品的轮播图图片数组
            }
        },
        created(){
            this.getimagelist(); //1.0.4 调用方法
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
           }
        },
        components:{
            SubImgSilder
        }
    }
</script>
