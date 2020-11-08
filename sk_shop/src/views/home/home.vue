<template>
    <div id="home">
        <div>
            <Header/>
            <Sowing :sowing_list="sowing_list"/>
            <Nav :nav_list="nav_list"/>
            <FlashSale :flashsale_list="flashsale_list"/>
            <YouLike :youLike_list="youLike_list"/>
        </div>
    </div>
</template>

<script>

    //引入
    import {getSowingdata,getNavdata,getFlashdata,getYoulikedata} from './../../../../admin/src/service/api/index'
    import Header from './components/header/header'
    import Sowing from './components/sowing/sowing'
    import Nav from './components/nav/nav'
    import FlashSale from './components/flashSale/flashsale'
    import YouLike from './components/youlike/YouLike'

    //引入通知插件
    import pubSub from 'pubsub-js'
    import {Toast} from "vant";


    //引入vuex
    import {mapMutations} from 'vuex'

    export default {
        name: "home",
        data(){
            return {
                //首页轮播图数据
                sowing_list:[],
                //导航的数据
                nav_list:[],
                //限时抢购数据
                flashsale_list:[],
                //猜你喜欢数据
                youLike_list:[]
            }
        },
        created() {
            this.initData();
        },
        components:{
            Header,
            Sowing,
            Nav,
            FlashSale,
            YouLike
        },
        methods:{
            ...mapMutations(['ADD_GOODS']),
            async initData(){
                //轮播图数据
                let sowingSrc = await getSowingdata();
                if (sowingSrc.status === 200){
                    this.sowing_list = sowingSrc.result;
                }
                //导航数据
                let navSrc = await getNavdata();
                if (navSrc.status === 200){
                    this.nav_list = navSrc.result;
                }
                //抢购数据
                let flashSrc = await getFlashdata();
                if (flashSrc.status === 200){
                    this.flashsale_list = flashSrc.result;
                }
                //喜欢数据
                let youlikeSrc = await getYoulikedata();
                if (youlikeSrc.status === 200){
                    this.youLike_list = youlikeSrc.result;
                }

            },

        }

    }
</script>

<style scoped>
#home{
    width: 510px;
    height: 2000px;
    background-color: #f5f5f5;
}
</style>