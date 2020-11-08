<template>
    <div id="catecontent">
        <div class="left-part">
                <ul>
                    <li
                            v-for="(cate,index) in categoriesData"
                            :class="{selected:currentIndex === index}"
                            @click="clickLeft(index)"
                            :key="cate._id"
                            ref="leftList"
                    >
                        <span>{{cate.descWord}}</span>
                    </li>
                </ul>
            </div>
        <div class="right-part">
            <cate-item v-for="(product,index) in categoriesDetailData0" :key="product.id" :product="product"/>
        </div>
    </div>
</template>

<script>
    //引入滚动组件
    import  BScroll from 'better-scroll'
    //引入商品部分
    import CateItem from './cateItem'
    export default {
        name: "catecontent",
        props:{
            categoriesData:Array,
            categoriesDetailData0:Array,
        },
        components:{
            CateItem
        },
        data(){
            return{
                currentIndex:0,
            }
        },
        created(){
            this.$nextTick(()=>{
                this.leftScorll = new BScroll('.left-part',{
                    probeType:3,
                    click:true,
                    scrollY:true
                })
            })
        },
        methods:{
            clickLeft(index){
                this.currentIndex = index;
                //滚动到相应位置
                let leftList = this.$refs.leftList;
                let el = leftList[index];
                this.leftScorll.scrollToElement(el,300);
            }
        }
    }
</script>

<style scoped>
    #catecontent{
        width: 100%;
        height: 80%;
        position: relative;

    }
    .left-part{
        width: 25%;
        height: 700px;
        overflow: hidden;
    }
    .left-part li{
        width: 125px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
        background-color: #f5f5f5;
        top: 0px;
    }
    .left-part .selected{
        background-color: white;
    }
    .right-part{
        width: 75%;
        height: 100%;
        position: absolute;
        right: 0px;
        top: 0px;
        overflow-y:scroll;

    }
    .cateintro1{
        color: gray;
        font-size: 18px;
        background-color: #f5f5f5;

    }
    .cateintro2{
        color: gray;
        font-size: 18px;
        background-color: #f5f5f5;
    }
</style>