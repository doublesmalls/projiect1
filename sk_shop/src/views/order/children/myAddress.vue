<template>
    <div id="address">
        <van-nav-bar
                title="我的地址"
                left-text="返回"
                :border="true"
                left-arrow
                :fixed="true"
                @click-left="onClickLeft"
        >
        </van-nav-bar>
        <van-address-list
                style="margin-top: 44px;height: 80%;"
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @select="onBackAdress"
                @add="onAdd"
                @edit="onEdit"
        ></van-address-list>
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {getUserAddress} from "../../../../../admin/src/service/api";
    import {Toast} from 'vant'
    import {mapState} from 'vuex'
    import Pubsub from 'pubsub-js'

    export default {
        name: "myAddress",
        data(){
            return{
                chosenAddressId: '1',
                list:[]
            }
        },
        computed:{
            ...mapState(['userInfo'])
        },
        created(){
            this.initUserAddress();
        },
        mounted(){
            this.initUserAddress();
            //订阅地址成功
            Pubsub.subscribe('addAddressSuccess',(msg)=>{
                if (msg === 'addAddressSuccess'){
                    this.initUserAddress();
                }
            });
        },
        methods:{
            onClickLeft(){
                this.$router.back();
            },
            onAdd() {
                //Toast('新增地址');
                this.$router.push({
                    path:'/confirmOrder/myAddress/addAddress'
                })
            },
            onEdit(item, index) {
                // Toast('编辑地址:' + index);
                this.$router.push({
                    path:'/confirmOrder/myAddress/editAddress?address_id='+item.address_id
                })
            },
            //获取用户当前地址
            async initUserAddress(){
                if (this.userInfo.token){
                    let result = await getUserAddress(this.userInfo.token);
                    this.list = [];
                    if (result.status === 200){
                        let addressArr = result.result;
                        addressArr.forEach((address,index)=>{
                            let addressObj = {
                                id:String(index+1),
                                name:address.address_name,
                                tel:address.address_phone,
                                address:address.address_area+address.address_detail,
                                addressDetail:address.addressDetail,
                                address_id:address._id,
                            };
                            this.list.push(addressObj);

                        })
                    }else {
                        Toast({
                            message:'获取地址失败',
                            duration:500
                        })
                    }

                }else{
                    Toast({
                        message:'登录已过期，请重新登录',
                        duration:500
                    })
                }
            },
            //返回选中的地址
            onBackAdress(item,index){
                Pubsub.publish('userAddress',item);
                this.$router.back();
            }
        },
        beforeDestroy() {
            Pubsub.unsubscribe('addAddressSuccess');
        }
    }
</script>

<style scoped>
    #address{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #f5f5f5;
        z-index: 100;
        top: 0;
    }
    .router-slider-enter-active,.router-slider-leave-active{
        transition:all 0.3s;
    }
    .router-slider-enter,.router-slider-leave-active{
        transform: translate3d(20px,0,0);
        opacity: 0;
    }
</style>