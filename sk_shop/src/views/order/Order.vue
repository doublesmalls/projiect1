<template>
    <div id="order">
        <van-nav-bar
                title="填写订单"
                left-text="返回"
                left-arrow
                :fixed="true"
                :border="true"
                @click-left="onClickLeft"
                >
        </van-nav-bar>
        <van-contact-card
                :type="addressType"
                add-text="选择收货地址"
                :name="address_name"
                :tel="address_phone"
                @click="chooseAddress"
                style="margin-top: 44px"
        >
        </van-contact-card>

        <van-cell-group style="margin-top: 10px">
            <van-cell  title="送达时间" :value="arriveDate" @click="showPopup" is-link></van-cell>
            <van-cell  title="内容" is-link></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 10px">
            <van-cell  title="支付方式" value="微信" is-link></van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 10px">
            <van-cell  title="备注" is-link>
                <input type="text" placeholder="选填，备注您的需求" style="border: none">
            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 10px">
            <van-cell  title="商品金额"></van-cell>
            <van-cell  title="配送费"></van-cell>
        </van-cell-group>

        <van-submit-bar :price="totalPride" button-text="提交订单" @submit="onSubmit"></van-submit-bar>

        <!-- 弹出日期组件 -->
        <van-popup v-model="dataShow" round position="bottom">
            <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    title="选择年月日"
                    @cancel="onDateCancel"
                    @confirm="onDateConfirm"
                    :min-date="minDate"
                    :max-date="maxDate">
            </van-datetime-picker>
        </van-popup>

        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {getGoodsCart} from "../../../../admin/src/service/api";
    import {mapState} from 'vuex'
    import Pubsub from 'pubsub-js'

    import Moment from 'moment'
    export default {
        name: "Order",
        computed:{
            ...mapState(["shopCart"]),
            //计算商品总价
            totalPride(){
                let totalPrice = 0;
                Object.values(this.shopCart).forEach((goods,index)=>{
                    if (goods.checked){
                        totalPrice += goods.price * goods.num;
                    }
                });
                return totalPrice*100;
            }
        },
        data(){
            return{
                //地址
                addressType:'add', //卡片类型
                address_name:null, //用户名字
                address_phone:null, //用户电话
                address_id:null,   //用户地址ID
                //日期
                dataShow:false,
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(2025, 10, 1),
                currentDate:new Date(),
                //送达时间
                arriveDate:''
            }
        },
        methods:{
            onClickLeft(){
                this.$router.back();
            },
            chooseAddress(){
                this.$router.push('/confirmOrder/myAddress');
            },
            getTotalPrice(){
                console.log(this.totalPrice);
            },
            onSubmit(){

            },
            //展示日期
            showPopup(){
                this.dataShow = true;
            },
            //取消日期组件
            onDateCancel(){
                this.dataShow = false;
            },
            //确认日期组件
            onDateConfirm(value){
                this.dataShow = false;
                this.arriveDate = Moment(value).format('YYYY-MM-DD hh:mm');
            }
        },
        mounted(){
            this.getTotalPrice();
            //接收收货地址
            Pubsub.subscribe('userAddress',(msg,Address)=>{
                if (msg === 'userAddress'){
                    this.addressType = 'edit';
                    this.address_name = Address.name;
                    this.address_phone = Address.tel;
                    this.address_id = Address.address_id;
                }
            })
        }
    }
</script>

<style scoped>
    #order{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
    .router-slider-enter-active,.router-slider-leave-active{
        transition:all 0.3s;
    }
    .router-slider-enter,.router-slider-leave-active{
        transform: translate3d(20px,0,0);
        opacity: 0;
    }
</style>