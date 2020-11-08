<template>
    <div id="carts">
        <Tabs value="name1">
            <TabPane label="介绍条" name="name1">
                <form action="http://172.20.10.3:3000/api/cartsdesc/add" method="post" enctype = "multipart/form-data">
                    <input name="descWord" type="text" placeholder="分类名">
                    <input type="submit" value="提交">
                </form>
                <ul>
                    <li class="descs" v-for="(desc,index) in descData">
                        <span>{{desc.descWord}}</span>
                        <span @click="deleteDesc(desc._id)" class="desc-delete">删除</span>
                    </li>
                </ul>
            </TabPane>
            <TabPane label="货物详情" name="name2">
                <form action="http://172.20.10.3:3000/api/detail/add" method="post" enctype = "multipart/form-data">
                    <input type="file" name="small_image">
                    <input type="text" name="name" placeholder="名称">
                    <input type="text" name="spec" placeholder="描述">
                    <input type="text" name="price" placeholder="价格">
                    <input type="submit" value="提交">
                </form>
                <ul>
                    <li class="details" v-for="(detail,index) in detailData">
                        <span class="detail-delete" @click="deleteDetail(detail._id)">删除</span>
                        <img :src="require(`../../../../admin/src/public/uploads/${detail.small_image}`)" :alt="detail.name">
                    </li>
                </ul>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import {getDescdata,deleteDescdata,getDetaildata,deleteDetaildata} from './../../../../admin/src/service/api/index'

    export default {
        name: "carts",
        created(){
            this.initData();
        },
        data(){
            return{
                descData:[],
                detailData:[]
            }
        },
        methods:{
            async initData(){
                //分类
                let decsSrc = await getDescdata();
                if (decsSrc.status === 200){
                    this.descData = decsSrc.result;
                }
                //细节
                let detailSrc = await getDetaildata();
                if (detailSrc.status === 200){
                    this.detailData = detailSrc.result;
                }
            },
            deleteDesc(descid){
                deleteDescdata(descid);
                alert('已删除');
                window.location.reload();
            },
            deleteDetail(detailid){
                deleteDetaildata(detailid);
                alert('已删除');
                window.location.reload();
            }
        }
    }
</script>

<style scoped>
    #carts{
        width: 80%;
        height: 100%;
        position: absolute;
        right: 0px;
        overflow: hidden;
    }
    #carts input{
        border-radius: 5px;
        padding: 5px;
        border: 1px solid #eeeeee;
    }
    #carts input:nth-child(2){
        width: 80px;
        margin: 10px;
    }
    .descs{
        width: 130px;
        height: 30px;
        margin: 20px;
        line-height: 30px;
        background-color: #eeeeee;
        display: inline-block;
        text-align: center;
        border-radius: 5px;
    }
    .desc-delete{
        text-align: center;
        width: 50px;
        height: 25px;
        line-height: 25px;
        opacity: 0.5;
        cursor: pointer;
        color: black;
        border-radius: 5px;
        margin-left: 5px;
        background-color: #ffffff;
        display: inline-block;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .details{
        width: 120px;
        height: 150px;
        margin: 30px;
        display: inline-block;
        position: relative;
    }
    .detail-delete{
        position: absolute;
        text-align: center;
        width: 100%;
        height: 30px;
        line-height: 25px;
        background-color: #d6d1d5;
        opacity: 0.8;
        cursor: pointer;
        top: 120px;
        border-radius: 5px;
    }
</style>