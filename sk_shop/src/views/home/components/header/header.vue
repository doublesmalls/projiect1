<template>
    <div id="wrapper">
        <div id="location">
            <img src="../../../../images/tabbar/location.png" alt="">
            <span class="address">五角大楼</span>
            <img src="../../../../images/tabbar/weibiaoti35.png" alt="">
        </div>
        <div id="search">
            <span class="goodinfo">输入商品信息</span>
        </div>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
    #wrapper{
        width: 100%;
        height: 50px;
        position: relative;
        background-color: white;
    }
    #location{
        width: 30%;
        height: 20px;
        left: 5px;
        top: 10px;
        position: absolute;
        line-height: 20px;
    }
    #location img{
        width: 10%;
        height: 100%;
        cursor: pointer;
    }
    .address{
        display: inline-block;
        width: 70px;
        margin-bottom: 20px;
        margin-left: 5px;
        margin-right: 5px;
        cursor: pointer;
    }
    #search{
        width:65%;
        height: 100%;
        position: absolute;
        right: 10px;
    }
    .goodinfo{
        display: inline-block;
        width:200px;
        text-align: center;
        line-height: 30px;
        height: 66%;
        cursor: pointer;
        border-radius: 50px;
        color: darkgray;
        margin-top: 5px;
        background-color: #eeeeee;
    }
</style>