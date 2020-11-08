<template>
    <div id="addAddress">
        <van-nav-bar
                title="新增地址"
                left-text="返回"
                :border="true"
                left-arrow
                :fixed="true"
                @click-left="onClickLeft"
        >
        </van-nav-bar>
        <van-address-edit
                style="margin-top: 40px"
                :area-list="areaList"
                show-postal
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @change-detail="onChangeDetail"
        ></van-address-edit>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import arealist from './../../../../../src/config/area'
    import {addNewAddress} from "../../../../../../admin/src/service/api";
    import {mapState} from 'vuex'
    import Pubsub from 'pubsub-js'

    export default {
        name: "addAddress",
        data() {
            return {
                areaList:arealist,
                searchResult: [],
            };
        },
        computed:{
            ...mapState(['userInfo'])
        },
        methods:{
            onClickLeft(){
                this.$router.back();
            },
            async onSave(content) {
                console.log(this.userInfo);
                if (this.userInfo.token){
                    let result = await addNewAddress(this.userInfo.token,content.name,content.tel,content.province+content.city+content.county,
                        content.province,content.city,content.county,content.areaCode,content.addressDetail,content.postalCode,content.isDefault);
                    if (result.status === 200){
                        Toast({
                            message:'添加地址成功',
                            duration:500
                        });
                        this.$router.back();
                        //发起通知
                        Pubsub.publish('addAddressSuccess');
                    }else{
                        Toast({
                            message:'添加地址失败',
                            duration:500
                        })
                    }
                }

            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [
                        {
                            name: '黄龙万科中心',
                            address: '杭州市西湖区',
                        },
                    ];
                } else {
                    this.searchResult = [];
                }
            }
        },
        
    }
</script>

<style scoped>
    #addAddress{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #f5f5f5;
        z-index: 9999;
        top: 0;
    }
</style>