<template>
    <div id="cateItem">
        <div class="cateItem-left">
            <img class="intro_img" :src="require(`../../../../../../admin/src/public/uploads/${product.small_image}`)">
        </div>
        <div class="cateItem-right">
            <span class="cateItem-Intro">{{product.name}}</span>
            <span class="cateItem-ad">{{product.spec}}</span>
            <span class="cateItem-price">{{product.price|moneyFormat}}</span>
            <img @click="addToCart(product)" class="cateItem-car" src="./../../../../images/tabbar/gouwuchekongwhite.png" alt="">
        </div>
    </div>
</template>
<script>
    import {mapMutations,mapState} from 'vuex'
    import {Toast} from 'vant'
    import {addGoodsToCart} from './../../../../../../admin/src/service/api/index'

    export default {
        name: "cateItem",
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
    #cateItem{
        width: 100%;
        height: 20%;
        border: gray;
        position: relative;
        border-bottom: 2px solid #eeeeee;

    }
    .cateItem-left{
        width:30%;
        height: 100%;
        display: inline-block;
        position: absolute;
        top: 0px;
    }
    .cateItem-right{
        display: inline-block;
        width: 70%;
        height: 100%;
        left: 30%;
        position: relative;
    }
    .cateItem-Intro{
        font-size: 19px;
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .cateItem-ad{
        color: gray;
        position: absolute;
        font-size: 15px;
        left: 10px;
        top: 35px;
    }
    .cateItem-price{
        color: red;
        position: absolute;
        left: 10px;
        bottom: 10px;
        font-weight: bolder;
    }
    .cateItem-car{
        background-color: #42b983;
        width: 25px;
        height: 25px;
        padding: 3px;
        border-radius: 50%;
        position: absolute;
        bottom: 10px;
        right: 30px;
    }
    .intro_img{
        width: 100%;
        height: 100%;
    }
</style>