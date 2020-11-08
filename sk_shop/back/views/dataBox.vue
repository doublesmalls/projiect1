<template>
    <div id="dataBox">
        <router-view/>
        <data-types/>
    </div>
</template>

<script>
    import dataTypes from './components/dataTypes'
    import sowings from './components/sowings'
    import carts from './components/carts'

    export default {
        name: "dataBox",
        components:{
            dataTypes,
            sowings,
            carts
        },

    }
</script>

<style scoped>
    #dataBox{
        width: 1440px;
        height: 748px;
    }
    #content{
        position: absolute;
        width: 100%;
    }
</style>