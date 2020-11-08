<template>
    <div id="cateheader">
        <span class="cate-search">输入商品名称</span>
    </div>
</template>

<script>
    export default {
        name: "cateheader",
    }
</script>

<style scoped>
    #cateheader {
        position: relative;
        left: 0;
        top: 0px;
        width: 100%;
        text-align: center;
        height: 50px;
        line-height: 50px;
        background-color: white;
    }
    .cate-search{
        width: 80%;
        height: 70%;
        display: inline-block;
        border-radius: 50px;
        color:gray;
        background-color: #eeeeee;
        line-height: 40px;
    }
</style>