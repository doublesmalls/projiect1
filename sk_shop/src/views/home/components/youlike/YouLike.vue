<template>
    <div id="wapper">
        <div class="TitleWapper">
            <span class="blockLine1"></span>
            <span class="wordWrapper">猜你喜欢</span>
            <span class="blockLine2"></span>
        </div>
        <div class="ContentWapper">
            <YouLikeitem v-for="(product,index) in youLike_list" :key="product.id" :product="product"/>
        </div>
    </div>
</template>

<script>
    import YouLikeitem from './YouLikeitem'
    export default {
        name: "YouLike",
        components:{
            YouLikeitem
        },
        props:{
            youLike_list:Array
        }
    }
</script>

<style scoped>
    #wapper{
        width: 100%;
        height: 300px;
        text-align: center;
    }
    .TitleWapper{
        width: 100%;
        height: 50px;
        position: relative;
        line-height: 50px;
    }
    .blockLine1{
        position: absolute;
        border-bottom: 1px solid gray;
        width: 170px;
        height: 25px;
        left: 0px;

    }
    .wordWrapper{
        font-size: 20px;
    }
    .ContentWapper{
        width:100%;
        background-color: #f5f5f5;

    }
    .blockLine2{
        position: absolute;
        border-bottom: 1px solid gray;
        width: 170px;
        height: 25px;
        right: 0px;
    }
</style>