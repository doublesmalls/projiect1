<template>
    <div id="mine" v-if="userInfo.token">
        <van-nav-bar title="我的"></van-nav-bar>

        <van-cell-group >
            <van-cell style=" background-color: #42b983; color: #ffffff" is-link>
                <template #title>
                    <div class="personMsg">
                        <img  @click="$router.push('/databorad/mine/userCenter')" src="./../../images/log/gakki.jpg" alt="">
                        <div class="personInfo">
                            <div>{{userInfo.username}}</div>
                            <span>手机号:</span>
                            <span>{{userInfo.userphone}}</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 10px">
            <van-cell icon="label" title="我的订单" value="查看全部订单" is-link></van-cell>
            <van-grid>
                <van-grid-item v-for="(order,index) in orderData" :key="index" :icon="order.icon" :text="order.title" />
            </van-grid>
        </van-cell-group>
        <van-cell-group style="margin-top: 10px">
            <van-cell icon="gold-coin-o" title="我的优惠卷" value="1张" is-link></van-cell>
            <van-cell icon="todo-list-o" title="我的收货地址" value="查看全部订单" is-link></van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 10px">
            <van-cell icon="phone" title="联系客服" is-link></van-cell>
            <van-cell icon="smile-comment" title="意见反馈" is-link></van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 10px">
            <van-cell icon="fire" title="小象买菜" value="下载APP体验更佳" is-link></van-cell>
        </van-cell-group>
        <!--路由出口-->
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    <select-login v-else/>

</template>

<script>
    import {mapState,mapMutations} from 'vuex'

    import SelectLogin from './../../views/login/SelectLogin'

    export default {
        name: "mine",
        data(){
            return{
                orderData:[
                    {icon:'pending-payment',title:'待支付'},
                    {icon:'paid',title:'待收货'},
                    {icon:'chat-o',title:'待评价'},
                    {icon:'cash-back-record',title:'售后/退款'}
                ]
            }
        },
        computed:{
            ...mapState(['shopCart','userInfo']),
        },
        components:{
            SelectLogin
        }
    }
</script>

<style scoped>
    #mine{
        width: 100%;
        height:  100%;
    }
    .van-nav-bar{
        background-color: #42b983;
        border: none;
    }
    .van-nav-bar__title{
        color: #ffffff;
        border: none;

    }
    .personMsg{
        width: 100%;
        height: 65px;

    }
    .personMsg img{
        width: 65px;
        height: 65px;
        border-radius: 50%;
    }
    .personInfo{
        width: 200px;
        height: 50px;
        position: absolute;
        top: 20px;
        left: 100px;
    }
    .router-slider-enter-active,.router-slider-leave-active{
        transition:all 0.3s;
    }
    .router-slider-enter,.router-slider-leave-active{
        transform: translate3d(20px,0,0);
        opacity: 0;
    }
</style>