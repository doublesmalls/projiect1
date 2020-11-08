<template>
    <div id="editAddress">
        <van-nav-bar
                title="修改地址"
                left-text="返回"
                :border="true"
                left-arrow
                :fixed="true"
                @click-left="onClickLeft"
        >
        </van-nav-bar>
        <van-address-edit
                :area-list="areaList"
                :address-info="addressInfo"
                show-postal
                show-delete
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
        ></van-address-edit>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import {mapState} from 'vuex'
    import {getCurrentAddress,changeAddress,deleteAddress} from "../../../../../../../work/Vue_pro/admin/src/service/api";
    import arealist from './../../../../../src/config/area'
    import Pubsub from 'pubsub-js'

    export default {
        name: "addAddress",
        data() {
            return {
                areaList:arealist,//省市区
                searchResult: [],
                addressInfo:{}//地址信息
            };
        },
        computed:{
            ...mapState(['userInfo'])
        },
        mounted(){
              if (this.$route.query.address_id){
                  if (this.userInfo.token){
                      this.getCurrentAddress(this.userInfo.token,this.$route.query.address_id);
                  }
              }
        },
        methods:{
            onClickLeft(){
                this.$router.back();
            },
            async onSave(content) {
                //(address_id,user_id,address_name,address_phone,address_area,province,city,county,areaCode,address_detail,post_code,address_tag
                if (this.userInfo.token){
                    //发起修改请求
                    let result = await changeAddress(this.addressInfo.id,this.userInfo.token,content.name,content.tel,content.province+content.city+content.county,
                    content.province,content.city,content.county,content.areaCode,content.addressDetail,content.postalCode,content.isDefault);
                    if (result.status === 200){
                        Toast({
                            message:'修改成功',
                            duration:500
                        });
                        this.$router.back();
                        Pubsub.publish('addAddressSuccess')
                    }else{
                        Toast({
                            message:'修改失败',
                            duration:500
                        });
                    }
                }
            },
            //删除用户地址
            async onDelete() {
                let result = await deleteAddress(this.addressInfo.id);
                if (result.status === 200){
                    Toast({
                        message:'删除成功',
                        duration:500
                    });
                    this.$router.back();
                    Pubsub.publish('addAddressSuccess');
                }else{
                    Toast({
                        message:'删除失败',
                        duration:500
                    });
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
            },
            async getCurrentAddress(user_id,address_id){
                let result = await getCurrentAddress(user_id,address_id);
                console.log(result);
                if (result.status === 200){
                    this.addressInfo = {
                        id : result.result._id,
                        name : result.result.address_name,
                        tel : result.result.address_phone,
                        province : result.result.province,
                        city : result.result.city,
                        county : result.result.county,
                        addressDetail : result.result.address_detail,
                        areaCode : result.result.areaCode,
                        postalCode : result.result.post_code,
                        isDefault:result.result.address_tag
                    }
                }
            }
        },

    }
</script>

<style scoped>
    #editAddress{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #f5f5f5;
        z-index: 9999;
        top: 0;
    }
</style>