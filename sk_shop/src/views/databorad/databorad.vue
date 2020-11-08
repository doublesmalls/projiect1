<template>
    <div id="databorad">
        <van-tabbar v-model="active">
            <van-tabbar-item replace to="/databorad/home">
                <span>首页</span>
                <img slot="icon" slot-scope="props" :src="props.active ?  home_icon.active :  home_icon.inactive">
            </van-tabbar-item>

            <van-tabbar-item replace to="/databorad/category">
                <span>分类</span>
                <img slot="icon" slot-scope="props" :src="props.active ?  category_icon.active :  category_icon.inactive">
            </van-tabbar-item>

            <van-tabbar-item replace to="/databorad/cart" :info="goodNum > 0 ? goodNum : '' ">
                <span>购物车</span>
                <img slot="icon" slot-scope="props" :src="props.active ? cart_icon.active : cart_icon.inactive">
            </van-tabbar-item>

            <van-tabbar-item replace to="/databorad/mine">
                <span>我的</span>
                <img slot="icon" slot-scope="props" :src="props.active ? mine_icon.active : mine_icon.inactive">
            </van-tabbar-item>
        </van-tabbar>
        <keepAlive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keepAlive>
        <router-view v-if="!$route.meta.keepAlive"/>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions} from 'vuex'
    import {getGoodsCart} from "../../../../admin/src/service/api";
    import {setStore} from "../../config/global";

    //引入通知插件
    import pubSub from 'pubsub-js'
    import {Toast} from "vant";
    export default {
        name: "databorad",
        data() {
            return {
                active: Number(sessionStorage.getItem('toBarActiveIndex')) ,
                home_icon: {
                    active: require('@/images/tabbar/jia_selected.png'),
                    inactive:require('@/images/tabbar/jia.png')
                },
                category_icon: {
                    active:  require('@/images/tabbar/fenlei_selected.png'),
                    inactive:require('@/images/tabbar/fenlei.png')
                },
                cart_icon: {
                    active: require('@/images/tabbar/gouwuche_selected.png'),
                    inactive:require('@/images/tabbar/gouwuchekong.png')
        },
                mine_icon: {
                    active: require('@/images/tabbar/wode_selected.png'),
                    inactive: require('@/images/tabbar/wode.png')
                }
            }
        },
        watch:{
            active(value){
                sessionStorage.setItem('toBarActiveIndex',value);
            }
        },
        computed:{
            ...mapState(['shopCart','userInfo']),
            goodNum(){
                if (this.shopCart){
                    let num = 0;
                    Object.values(this.shopCart).forEach((goods,index)=>{
                        num += goods.num;
                    });
                    return num;
                }else{
                    return 0;
                }
            }
        },
        mounted() {
            //自动登录
            this.reqUserInfo();

            //获取购物车的数据
            this.initShopCart();
        },
        methods:{
            ...mapMutations(['INIT_SHOP_CART']),
            ...mapActions(['reqUserInfo']),
            async initShopCart(){
                if (this.userInfo.token){    //用户已经登录
                    //获取用户购物车的信息
                    let result = await getGoodsCart(this.userInfo.token);
                    if (result.status === 200) {
                        //转换数据格式
                        let cartArr = result.result;
                        let shopCart = {};
                        cartArr.forEach((value)=>{
                            shopCart[value.goods_id] = {
                                "num" :value.num,
                                "id":value.goods_id,
                                "name":value.goods_name,
                                "small_image":value.small_image,
                                "price":value.goods_price,
                                "checked":value.checked
                            };
                        });
                        //本地数据同步x
                        setStore('shopCart',shopCart);
                        this.INIT_SHOP_CART();
                    }
                }
            }
        }
    }
</script>

<style scoped>
#databorad{
    width: 510px;
    height:  100%;
    background-color: #f5f5f5;
}
</style>