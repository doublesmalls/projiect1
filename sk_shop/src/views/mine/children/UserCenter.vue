<template>
    <div id="userCenter">
        //导航栏
        <van-nav-bar
                title="用户中心"
                :border="true"
                left-arrow
                :fixed="true"
                @click-left="$router.go(-1)"
        >
        </van-nav-bar>
        <div class="logout">
            <button @click="logOut">退出登录</button>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {Toast} from 'vant'
    export default {
        name: "UserCenter",
        methods:{
            ...mapMutations(["RESET_USER_INFO","CLEAR_CART"]),
            logOut(){
                //清空本地数据
                this.RESET_USER_INFO();
                //清空购物车数据
                this.CLEAR_CART();
                Toast({
                    message:'退出登录成功',
                    duration:500
                })
            }
        }
    }
</script>

<style scoped>
    #userCenter{

        position: fixed;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: #f5f5f5;
        z-index: 200;
    }
    .logout{
        width: 100%;
        height: 50px;
        position: absolute;
        top: 50px;
        background-color: #ffffff;
        text-align: center;
        line-height: 50px;
    }
    .logout button{
        border: none;
        background-color: #ffffff;
        font-size: 16px;
        color: black;
        cursor: pointer;
    }
</style>