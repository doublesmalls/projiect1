<template>
    <div id="cart" v-if="userInfo.token">
        <div class="cart-head">
            <span class="headTitle">购物车</span>
            <span @click="clearCart()" class="cartClear">清空购物车</span>
        </div>
        <div class="cart-content">
                <div v-for="(goods,index) in shopCart" :key="goods.id" class="cart-item">
                    <div class="cartItemleft">
                        <input class="isSelected" type="checkbox" @click="singelGoodsSelected(goods.id,goods.checked)" v-model='goods.checked'>
                        <img :src="require(`../../../../admin/src/public/uploads/${goods.small_image}`)">
                    </div>
                    <div class="cartItemright">
                        <span>{{goods.name}}</span>
                        <span class="cartItemright-price">{{goods.price | moneyFormat}}</span>
                        <span ><span @click="removeOutCart(goods.id,goods.num)" class="cartItem-num1">-</span>
                    <span class="cartItem-num3">{{goods.num}}</span>
                    <span @click="addToCart(goods.id,goods.name,goods.small_image,goods.price)" class="cartItem-num2">+</span>
                    </span>
                    </div>
                </div>
        </div>
        <div class="cart-foot">
            <input v-model="isSelectAll" @click.stop="selectedAll(isSelectAll)" class="selectChoose" type="checkbox">
            <span class="selectAll">全选</span>
            <span class="subAll">合计：</span>
            <span class="selectPrice">{{totalPride | moneyFormat}}</span>
            <router-link class="checkChoose" :to="{path:'/confirmOrder'}">去结算({{goodsCount}})</router-link>
        </div>
    </div >
    <select-login v-else/>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import {Dialog,Toast} from 'vant'
    import {ADD_GOODS} from "../../store/mutations-type";
    import SelectLogin from './../../views/login/SelectLogin'
    import {changeCartNum,clearAllCart,singer_select,all_select} from "../../../../admin/src/service/api";

    export default {
        name: "cart",
        computed:{
            ...mapState(["shopCart","userInfo"]),
            //选中商品总件数
            goodsCount(){
                let selectedGoodCount = 0;
                Object.values(this.shopCart).forEach((goods,index)=>{
                    if (goods.checked){
                        selectedGoodCount += 1;
                    }
                });
                return selectedGoodCount;
            },
            //商品是否全选
            isSelectAll:{
                get:function () {
                    let tag =  this.goodsCount > 0;
                    Object.values(this.shopCart).forEach((goods,index)=>{
                        if (!goods.checked){
                            tag = false;
                        }
                    });
                    return tag;
                },
                set:function () {
                    let tag =  false;
                    Object.values(this.shopCart).forEach((goods,index)=>{
                        if (!goods.checked){
                            goods.checked = false;
                        }
                    });
                    return tag;
                }
            },
            //计算商品总价
            totalPride(){
                let totalPrice = 0;
                Object.values(this.shopCart).forEach((goods,index)=>{
                    if (goods.checked){
                        totalPrice += goods.price * goods.num;
                    }
                });
                return totalPrice;
            }
        },
        data(){
            return{
                isChecked : false
            }
        },
        methods:{
            ...mapMutations(['REDUCE_CART','ADD_GOODS','SELECTED_SINGER_GOODS','SELECTED_ALL_GOODS','CLEAR_CART']),
            //移出购物车
            async removeOutCart(goodsId,goodNum){
                let result = await changeCartNum(this.userInfo.token,goodsId,'cut');
                if (result.status === 200){
                    this.REDUCE_CART({goodsId});
                }else {
                    Toast({
                        message:'出了点问题',
                        duration:500
                    });
                }
                 if(goodNum === 1){
                    Dialog.confirm({
                        title: '温馨提示',
                        message: '确定删除该商品信息吗'
                    }).then(async() => {
                        let result = await changeCartNum(this.userInfo.token,goodsId,'cut');
                        if (result.status === 200){
                            this.REDUCE_CART({goodsId});
                        }else {
                            Toast({
                                message:'出了点问题',
                                duration:500
                            });
                        }

                    }).catch(() => {
                        //do nothing
                    });
                }
            },
            async addToCart(goodsId,goodName,smallImage,goodsPrice){
                let result = await changeCartNum(this.userInfo.token,goodsId,'add');
                    if (result.status === 200){
                        this.ADD_GOODS({
                            goodsId,
                            goodName,
                            smallImage,
                            goodsPrice
                        })
                    }else {
                        Toast({
                            message:'出了点问题',
                            duration:500
                        });
                    }
            },
            //单个商品选中和取消选中
            async singelGoodsSelected(goodsId,checked){
                let result = await singer_select(this.userInfo.token,goodsId,checked);
                console.log(result);
                this.SELECTED_SINGER_GOODS({goodsId});

            },
            //全选和取消全选
            async selectedAll(isSelected){
                this.SELECTED_ALL_GOODS({isSelected});
            },
            //清空购物车
            clearCart(){
                Dialog.confirm({
                    title: '温馨提示',
                    message: '确定清空购物车吗？'
                }).then(async () => {
                    let result = await clearAllCart(this.userInfo.token);
                    if (result.status === 200){
                        this.CLEAR_CART();
                    }else {
                        Toast({
                            message:'出了点问题',
                            duration:500
                        });
                    }
                }).catch(() => {
                    //do nothing
                });
            }
        },
        components:{
            SelectLogin
        }
    }
</script>

<style scoped>
    #cart{
        width: 100%;
        height:  100%;
        background-color:#eeeeee;
    }
    .cart-head{
        width: 100%;
        height: 7%;
        position: relative;
        background-color: #ffffff;
    }
    .headTitle{
        position: absolute;
        left: 44%;
        top: 10px;
        font-weight: bolder;
        font-family: ".SF NS Text";
        font-size: 18px;
    }
    .cartClear{
        color: red;
        position: absolute;
        right: 10px;
        top: 13px;
        font-size: 14px;
        font-weight: bolder;
        cursor: pointer;
    }
    .cart-foot{
        width: 100%;
        height: 5%;
        position: fixed;
        bottom: 50px;
        background-color: #ffffff;
    }
    .selectChoose{
        position: absolute;
        top: 8px;
        left: 15px;
    }
    .selectAll{
        position: absolute;
        top: 6px;
        left: 32px;
    }
    .subAll{
        position: absolute;
        top: 6px;
        left: 20%;
    }
    .selectPrice{
        position: absolute;
        top: 10px;
        left: 30%;
    }
    .checkChoose{
        position: absolute;
        top: 4px;
        right: 5%;
        background-color: red;
        color: white;
        border-radius: 50px;
        border: none;
        padding: 5px;
        cursor: pointer;
    }
    .cart-content{
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        position: relative;
    }
    .cart-item{
        width: 100%;
        height: 140px;
        margin: 3px;
        background-color: #eeeeee;
    }
    .cartItemleft{
        width: 40%;
        height: 100%;
        position: relative;
        display: inline-block;
    }
    .cartItemleft input{
        position: absolute;
        left: 10px;
        top: 30px;
    }
    .cartItemleft img{
        width: 81%;
        height: 100%;
        position: absolute;
        left: 35px;
        display: inline-block;
    }
    .cartItemright{
        width: 60%;
        height: 100%;
        position: relative;
        bottom: 123px;
        display: inline-block;
    }
    .cartItemright-price{
        position: absolute;
        left: 10px;
        bottom: 10px;
        font-size: 18px;
    }
    .cartItem-num1{
        display: inline-block;
        width: 20px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        position: absolute;
        bottom: 0px;
        right: 40px;
        cursor: pointer;
    }
    .cartItem-num2{
        display: inline-block;
        position: absolute;
        bottom: 0px;
        right: 0px;
        cursor: pointer;
        line-height: 30px;
        text-align: center;
        width: 20px;
        height: 30px;
    }
    .cartItem-num3{
        display: inline-block;
        width: 30px;
        height: 30px;
        background-color: #f5f5f5;
        position: absolute;
        right: 15px;
        bottom: 0px;
        text-align: center;
        line-height: 30px;
    }
    .isSelected{
        cursor: pointer;
        width: 25px;
        height: 25px;
        background-color: #ffffff;
        border-radius: 50px;
        position: absolute;
        top: 10px;
        left: 5px;
    }
</style>