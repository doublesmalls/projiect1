<template>
    <div id="login">
        <div class="header">
            <img class="img1" src="./../../images/log/girl.png" alt="">
            <img class="img2" src="./../../images/log/word.png" alt="">
        </div>
        <div class="login-header">
            <a :class="{current:loginMode}" @click="dealLoginMode(true)">手机登录</a>
        </div>
            <div>
                    <div class="login-content1" :class="{current: loginMode}">
                        <div class="login-content-number">
                            <input name="" placeholder="手机号" type="text" v-model="phone">
                            <button v-if="!countDown"  @click="getVerifyCode()" class="login-Verification" :class="{phone_right:phoneRight}">获取验证码</button>
                            <button v-else disabled="disabled">已发送{{countDown}}s</button>
                        </div>
                        <div class="login-content-check">
                            <input placeholder="验证码" type="text" v-model="code">
                        </div>
                    </div>

                <div class="login-foot">
                    <button class="login-foot-login" @click="login()">登录</button>
                    <button class="login-foot-back" @click="$router.back(-1)">返回</button>
                </div>
            </div>
    </div>
</template>

<script>
    import {getPhoneCode,getPhoneCodeLogin} from "../../../../admin/src/service/api";
    import {Toast} from 'vant';
    import {mapActions} from 'vuex'

    export default {
        name: "Login",
        data(){
            return {
                loginMode:true,  //登录模式
                phone:null,      //手机号码
                countDown:0,      //倒计时
                code:null,        //输入验证码
                num:null,            //获取验证码
                userInfo:null      //用户信息
            }
        },
        methods:{
            ...mapActions(["syncUserInfo"]),
            dealLoginMode(flag){
                this.loginMode = flag
            },
            //接收短信验证码
            async getVerifyCode(){
                if (this.phoneRight){
                    this.countDown = 60;
                    this.intervalId = setInterval(()=>{
                        this.countDown--;
                        if (this.countDown === 0){
                            clearInterval(this.intervalId);
                        }
                    },1000);
                    //接收短信验证码
                    let result = await getPhoneCode();
                    this.num = result.message.data.number;
                    console.log(result.message.data.number);
                }
            },

            //登录
            async login(){
                if (this.loginMode){  //短信验证码登录
                    //输入数据校验
                    if (!this.phone){
                        Toast({
                           message:'请输入手机号码',
                            duration:500
                        });
                        return;
                    }else if(!this.phoneRight){
                        Toast({
                            message:'请输入正确的手机号码',
                            duration:500
                        });
                        return;
                    }

                    if (!this.code){
                        Toast({
                            message:'请输入验证码',
                            duration:500
                        });
                        return;
                    }
                    if (this.num != this.code){
                        Toast({
                            message:'验证码错误',
                            duration:500
                        });
                        return;
                    }
                    else if(!(/^\d{6}$/gi.test(this.code))){  //验证码不正确
                        Toast({
                            message:'请输入正确的验证码',
                            duration:500
                        });
                        return;
                    }

                    //手机验证码登录
                    let result = await getPhoneCodeLogin(this.phone,this.code);
                    if (result.status === 200){
                        this.userInfo = result.message;
                        this.userInfo.token = this.userInfo._id;
                        console.log(this.userInfo);
                    }
                }
                //保存信息
                this.syncUserInfo(this.userInfo);
                this.$router.back();
            }
        },
        computed:{

            phoneRight(){
                return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone);
            }
        }
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
        left: 50px;
        top: 50px;
    }
    .img2{
        width: 200px;
        height: 50px;
        position: absolute;
        right: 40px;
        top: 80px;
    }
    .login-header{
        position: absolute;
        top: 340px;
        left: 36%;
    }
    .login-header a{
        color: gray;
        margin: 20px;
        font-weight: bolder;
        cursor: pointer;
    }
    .current{
        color: #3bba63 !important;
    }
    .login-content1{
        position: absolute;
        top: 400px;
        left: 20%;
        display: none;
    }
    .login-content1.current{
        display: block;
    }
    .login-content2{
        position: absolute;
        top: 400px;
        left: 20%;
        display: none;
    }
    .login-content2.current{
        display:block!important;
    }
    .login-content-number{
        color: black;
    }
    .login-content-number input{
        width: 280px;
        height: 40px;
        padding: 5px;
        border: 1px solid #eeeeee;
        position: relative;
        border-radius: 5px;
        font-size: 13px;
    }
    .login-content-number button{
        border: none;
        background-color: white;
        color: #d6d1d5;
        position: absolute;
        width: 80px;
        margin-top: 5px;
        height: 30px;
        left: 190px;
        cursor: pointer !important;
    }
    .login-Verification.phone_right{
        color: #3bba63;
    }
    .login-content-password{
        color: black;
    }
    .login-content-check{
        color: black;
    }
    .login-content-check img{
        width: 100px;
        position: absolute;
        right: 10px;
        top: 122px;
    }
    .login-content-check input, .login-content-password input{
        width: 280px;
        height: 40px;
        padding: 5px;
        font-size: 13px;
        margin-top: 20px;
        border: 1px solid #eeeeee;
        border-radius: 5px;
    }
    .login-foot{
        position: absolute;
        bottom: 180px;
        left: 28%;
        top: 610px;
    }
    .login-foot-login{
        color: white;
        background-color: #3bba63;
        width: 210px;
        height: 30px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .login-foot-back{
        color: #3bba63;
        background-color: white;
        width: 210px;
        height: 30px;
        border: 1px solid #3bba63;
        margin-top: 15px;
        border-radius: 5px;
        cursor: pointer;
    }
</style>