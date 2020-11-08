<template>
        <div id="wapper">
            <img :src="require(`../../../../../../admin/src/public/uploads/${product.small_image}`)">
            <div class="intro">{{product.name}}</div>
            <div class="origin_price">{{product.origin_price | moneyFormat}}</div>
            <div class="now_price">{{product.price | moneyFormat}}</div>
            <img @click="addToCart(product)" class="shoppingcar" src="./../../../../images/tabbar/gouwuchekongwhite.png" alt="">
        </div>
</template>

<script>
    import {mapMutations,mapState} from 'vuex'
    import {Toast} from 'vant'
    import {addGoodsToCart} from './../../../../../../admin/src/service/api/index'
    export default {
        name: "flashSaleitem",
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
        width:150px;
        height:240px;
        margin: 8px;
        position: relative;
        padding: 5px;
        border: 1px solid #eeeeee;
        display: inline-block;
    }
    .picture{
        width: 200px;
        height: 160px;

    }
    img{
        width: 100%;
        height: 70%;
    }
    .intro{
        width: 150px;
        font-size: 18px;
        text-align: center;
    }
    .origin_price{
        width: 100px;
        font-size: 14px;
        margin-left: 38px;
        color: gray;
    }
    .now_price{
        width: 100px;
        font-size: 14px;
        margin-left: 38px;
        color: brown;
    }
    .shoppingcar{
        background-color: #42b983;
        width: 25px;
        height: 25px;
        padding: 3px;
        border-radius: 50%;
        position: absolute;
        bottom: 0px;
        right: 10px;
    }
</style>