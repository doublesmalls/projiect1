<template>
    <div id="wapper">
        <div class="itemWapper">
            <img class="picture" :src="require(`../../../../../../admin/src/public/uploads/${product.small_image}`)">
            <span class="intro">{{product.name}}</span>
        </div>
        <div class="shopWapper">
            <span class="nowPrice">{{product.price | moneyFormat}}</span>
            <span class="originPrice">{{product.origin_price | moneyFormat}}</span>
            <img @click="addToCart(product)"  class="shoppingcar" src="./../../../../images/tabbar/gouwuchekongwhite.png" alt="">
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    import {mapMutations,mapState} from 'vuex'
    import {addGoodsToCart} from './../../../../../../admin/src/service/api/index'


    export default {
        name: "YouLikeitem",
        props:{
            product:Object
        },
        computed:{
            ...mapState(['userInfo'])
        },
        methods:{
            ...mapMutations(["ADD_GOODS"]),
            addToCart(goods){
                //判断用户是否登录
                if (this.userInfo.token){  //已登录
                    this.dealGoodsAdd(goods);
                } else{    //未登录
                    this.$router.push('/login');
                }
            },
            //添加商品到购物车
            async dealGoodsAdd(goods){
                let result = await addGoodsToCart(goods._id,goods.name,goods.price,goods.small_image,this.userInfo.token,goods.num);
                console.log(result);
                if (result.status === 200){
                    this.ADD_GOODS({
                        goodsId:goods._id,
                        goodsName:goods.name,
                        smallImage:goods.small_image,
                        goodsPrice:goods.price
                    });
                    //提示用户
                    Toast({
                        message:'添加到购物车成功！',
                        duration:800
                    })
                }
            }
        }
    }
</script>

<style scoped>
    #wapper{
        width:44% !important;
        height: 300px;
        display: inline-block;
        margin: 5px;
        background-color:white;
    }
    .itemWapper{
        width: 200px;
        height: 80%;
    }
    .shopWapper{
        height: 20%;
        width: 200px;
        position: relative;
    }
    .picture{
        width: 100%;
        height: 75%;
        display: inline-block;
        margin: 10px;
    }
    .intro{
        width: 100%;
        height: 25%;
    }
    .nowPrice{
        color:red;
        position: absolute;
        left: 50px;
        top: 20px;
        font-weight: bolder;
    }
    .originPrice{
        color: gray;
        position: absolute;
        left: 50px;
        font-weight: bolder;
        text-decoration: line-through;
    }
    .shoppingcar{
        background-color: #42b983;
        width: 25px;
        height: 25px;
        padding: 3px;
        border-radius: 50%;
        position: absolute;
        right: 10px;
        cursor: pointer;
        top: 20px;
    }
</style>