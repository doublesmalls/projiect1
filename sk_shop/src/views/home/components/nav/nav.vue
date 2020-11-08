<template>
    <div id="wrapper">
        <div class="itemWrapper" v-for="(nav,index) in nav_list" :key="nav.cid">
            <div class="imageWrapper">
                <img :src="require(`../../../../../../admin/src/public/uploads/${nav.icon_url}`)" :alt="nav.puclic_name">
            </div>
            <div class="titleWrapper">
                <span class="title">{{nav.public_name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "nav",
        props:{
            nav_list:Array
        }
    }
</script>

<style scoped>
    #wrapper{
       width: 100%;
        height: 200px;
        background-color: #f5f5f5;
        position: relative;
        overflow: hidden;
    }
    .itemWrapper{
        width: 18%;
        height: 80px;
        cursor: pointer;
        margin: 5px;
        overflow: visible;
        background-color: #b9cbff;
        display: inline-block;
    }
    .imageWrapper{
        width: 100%;
        height: 75%;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .titleWrapper{
        text-align: center;
        width: 100%;
        height: 25%;
        background-color: #f5f5f5;
    }
    .title{
        display: inline-block;
    }
</style>