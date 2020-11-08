<template>
    <div id="wrapper">
        <div class="titleWrapper">
            <div class="title">限时抢购</div>
            <span class="actionStatetext">07:00抢</span>
            <div class="actionstatetextEnd">已结束</div>
            <span class="more">更多</span>
        </div>
        <div class="itemWrapper">
            <div class="saleFar">
                <flash-saleitem v-for="(product,index) in flashsale_list" :key="product._id" :product="product"/>
            </div>
        </div>
    </div>
</template>

<script>
    import flashSaleitem from './flashSaleitem'
    export default {
        name: "flashsale",
        props:{
            flashsale_list:Array
        },
        components:{
            flashSaleitem
        }
    }
</script>

<style scoped>
    #wrapper{
        width: 100%;
        height: 330px;
        position: relative;
    }
    .saleFar{
        width: 1700px;
        height: 260px;
        overflow-x: scroll;
    }
    .itemWrapper{
        width: 100%;
        height: 260px;
        background-color:white;
        overflow: scroll;
    }
    .titleWrapper{
        height: 40px;
        line-height:40px ;
    }
    .title{
        left: 20px;
        position: absolute;
        display: inline-block;
        font-size: 20px;
    }
    .actionStatetext{
        left: 110px;
        color: crimson;
        position: absolute;
        display: inline-block;
    }
    .actionstatetextEnd{
        left: 170px;
        position: absolute;
        color: grey;
        height: 20px !important;
        top: 8px;
        line-height: 20px;
        border: 1px solid gray;
        display: inline-block;

    }
    .more{
        right: 25px;
        color: green;
        position: absolute;
        display: inline-block;
    }
</style>