<template>
    <div id="category">
        <div v-if="!showLoading">
            <cateheader/>
            <catecontent :categoriesData="categoriesData" :categoriesDetailData0="categoriesDetailData"/>
        </div>

        <van-loading
                v-else type="spinner"
                color="#1989fa"
                style="position: absolute;left: 50%;top: 40%;transform: translate(-50%)"
        >正在加载中</van-loading>
    </div>
</template>

<script>

    import cateheader from './component/header/cateheader'
    import catecontent from './component/content/catecontent'
    //引入接口数据
    import {getDescdata,getDetaildata} from './../../../../admin/src/service/api/index'
    export default {
        name: "category",
        data(){
          return {
              showLoading:true,
              categoriesData:[],
              categoriesDetailData:[]
          }
        },
        created(){
            this.initData();
        },
        components:{
            cateheader,
            catecontent
        },
        methods:{
            async initData(){
                //获取左边数据
                let leftRes = await getDescdata();
                if (leftRes.status === 200){
                    this.categoriesData = leftRes.result;
                }
                //获取右边数据
                let rightRes = await getDetaildata();
                if (rightRes.status === 200){
                    this.categoriesDetailData = rightRes.result;
                }

                //隐藏loading框
                this.showLoading = false;
            }
        }
    }
</script>

<style scoped>
#category{
    width: 100%;
    height:100%;
}
</style>