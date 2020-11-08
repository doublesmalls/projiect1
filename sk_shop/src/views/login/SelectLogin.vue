<template>
    <!-- 选择登录界面 -->
    <div id="SelectLogin">
        <div class="header">
            <img class="img1" src="./../../images/log/girl.png" alt="">

            <img class="img2" src="./../../images/log/word.png" alt="">
        </div>
        <div class="wayToLog"><span>选择登录方式</span></div>
        <router-link tag="button" class="phone" to="/login">手机登录</router-link>
    </div>
</template>

<script>
    export default {
        name: "SelectLogin"
    }
</script>

<style scoped>
    .header{
        width: 80%;
        height: 200px;
        position: relative;
        top: 130px;
        margin: auto;
        text-align: center;
        line-height: 200px;
    }
    .img1{
        width: 100px;
        height: 100px;
        position: absolute;
        left: 80px;
        top: 50px;
    }
    .img2{
        width: 200px;
        height: 50px;
        position: absolute;
        right: 20px;
        top: 80px;
    }
    .wayToLog{
        position: absolute;
        top: 45%;
        left: 39%;
        color: gray;
        font-weight: bolder;
    }
    .phone{
        position: absolute;
        width: 200px;
        height: 50px;
        border: none;
        color: white;
        background-color: #42b983;
        top: 55%;
        left: 30%;
        border-radius: 50px;
        font-weight: bolder;
    }
</style>