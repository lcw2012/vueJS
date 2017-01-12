<template>
    <div class="subtmpl">
        <div class="left" @click="substrict">-</div>
        <div class="middle">{{count}}</div>
        <div class="right" @click="add">+</div>
    </div>
</template>
<style scoped>
   .subtmpl div{
        padding: 5px;
        border: 1px solid rgba(92,92,92,0.3);
        display: inline-block;
    }

  .left,.right,.middle{
       width: 30px;
       height: 25px;
      line-height: 15px;
      text-align: center;
   }
    .middle{
        width: 40px;
        margin-bottom: 10px;
    }

</style>
<script>
    
    export default{
        data(){
            return{
               count:1
            }
        },
        methods:{
            //1.0 加1
           add(){
                this.count++;
                this.notiflycount();
           },
            //2.0 减1
            substrict(){
                //保证自减到1为止
                if(this.count <= 1){
                    this.count = 1;
                    return;
                }
                this.count--;
                this.notiflycount();
            },
            //3.0 将最新的count传入给父组件
            notiflycount(){
                let key = 'count';
                this.$emit(key,this.count); //当执行了这个代码以后，就会自动触发goodsinfo.vue中的getcount()
            }
        }
    }
</script>
