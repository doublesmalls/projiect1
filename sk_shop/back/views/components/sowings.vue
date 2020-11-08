<template>
  <div id="sowings">
      <Tabs class="tab" value="name1">
          <TabPane class="tabbar" label="轮播图" name="name1">
              <form action="http://172.20.10.3:3000/api/sowing/add" method="post" enctype = "multipart/form-data">
                  <input name="icon_url" type="file">
                  <input name="puclic_name" type="text">
                  <input class="subbtn" type="submit" value="添加">
              </form>
            <ul>
                <li class="sowings" v-for="(sowing,index) in sowingData">
                    <span class="sowing-delete" @click="deleteSowing(sowing._id)">删除</span>
                    <img :src="require(`../../../../admin/src/public/uploads/${sowing.icon_url}`)" :alt="sowing.puclic_name">
                </li>
            </ul>
          </TabPane>

          <TabPane class="tabbar" label="导航" name="name2">
              <form action="http://172.20.10.3:3000/api/nav/add" method="post" enctype = "multipart/form-data">
                  <input name="icon_url" type="file">
                  <input name="public_name" type="text">
                  <input class="subbtn" type="submit" value="添加">
              </form>
              <ul>
                  <li class="navs" v-for="(nav,index) in Navdata">
                      <span class="nav-delete" @click="deleteNav(nav._id)">删除</span>
                      <img :src="require(`../../../../admin/src/public/uploads/${nav.icon_url}`)" :alt="nav.public_name">
                  </li>
              </ul>
          </TabPane>

          <TabPane class="tabbar" label="抢购" name="name3">
              <form action="http://172.20.10.3:3000/api/flash/add" method="post" enctype = "multipart/form-data">
                  <input name="small_image" type="file">
                  <input name="name" type="text">
                  <input name="origin_price" type="text" placeholder="原价">
                  <input name="price" type="text" placeholder="现价">
                  <input class="subbtn" type="submit" value="添加">
              </form>
              <ul>
                  <li class="flashs" v-for="(flash,index) in flashData">
                      <span class="flash-delete" @click="deleteFlash(flash._id)">删除</span>
                      <img :src="require(`../../../../admin/src/public/uploads/${flash.small_image}`)" :alt="flash.name">
                  </li>
              </ul>
          </TabPane>

          <TabPane class="tabbar" label="喜欢" name="name4">
              <form action="http://172.20.10.3:3000/api/youlike/add" method="post" enctype = "multipart/form-data">
                  <input name="small_image" type="file">
                  <input name="name" type="text">
                  <input name="origin_price" type="text" placeholder="原价">
                  <input name="price" type="text" placeholder="现价">
                  <input class="subbtn" type="submit" value="添加">
              </form>
              <ul>
                  <li class="youlikes" v-for="(youlike,index) in youlikeData">
                      <span class="youlike-delete" @click="deleteYoulike(youlike._id)">删除</span>
                      <img :src="require(`../../../../admin/src/public/uploads/${youlike.small_image}`)" :alt="youlike.name">
                  </li>
              </ul>
          </TabPane>
      </Tabs>
  </div>
</template>

<script>
    import {getSowingdata,deleteSowingdata,getNavdata
            ,deleteNavdata,getFlashdata,deleteFlashdata
            ,getYoulikedata,deleteYoulikedata} from "../../../../admin/src/service/api";

    export default {
        name: "sowings",
        created(){
          this.initData();
        },
        data(){
          return{
              sowingData:[],
              Navdata:[],
              flashData:[],
              youlikeData:[],
              isShow:false
          }
        },
        methods:{
            async initData(){
                //轮播图
                let sowingSrc = await getSowingdata();
                if (sowingSrc.status === 200){
                    this.sowingData = sowingSrc.result;
                    if (this.sowingData.length > 5){
                        var sub = document.getElementsByClassName('subbtn')[0];
                        sub.disabled = true;
                    }
                }
                //导航
                let navSrc = await getNavdata();
                if (navSrc.status === 200){
                    this.Navdata = navSrc.result;
                }
                //抢购
                let flashSrc = await getFlashdata();
                if (flashSrc.status === 200){
                    this.flashData = flashSrc.result;
                }
                //喜欢
                let youlikeSrc = await getYoulikedata();
                if (youlikeSrc.status === 200){
                    this.youlikeData = youlikeSrc.result;
                }
            },
            dealIsShow(sowingid){
                this.isShow = !this.isShow;
            },
            deleteSowing(sowingid){
                 deleteSowingdata(sowingid);
                 alert('已删除');
                 window.location.reload();
            },
            deleteNav(navid){
                deleteNavdata(navid);
                alert('已删除');
                window.location.reload();
            },
            deleteFlash(flashid){
                deleteFlashdata(flashid);
                alert('已删除');
                window.location.reload();
            },
            deleteYoulike(youlikeid){
                deleteYoulikedata(youlikeid);
                alert('已删除');
                window.location.reload();
            },
            editSowing(){

            }
            
        }
    }
</script>

<style scoped>
    #sowings{
        width: 80%;
        height: 100%;
        position: absolute;
        right: 0px;
        overflow: hidden;
    }
    img{
        width:100%;
        height: 100%;
        border-radius: 5px;
        display: inline-block;
    }
    .sowings{
        width: 300px;
        height: 150px;
        margin: 30px;
        display: inline-block;
        position: relative;
    }
    .sowing-delete{
        position: absolute;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #d6d1d5;
        opacity: 0.8;
        cursor: pointer;
        top: 110px;
        border-radius: 5px;
    }
    .sowing-edit{
        position: absolute;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #d6d1d5;
        opacity: 0.8;
        cursor: pointer;
        top: 0px;
    }
    .sowings .editBox img{
        width: 220px;
        height: 130px;
        position: absolute;
        left: 30%;
        top: 120px;
    }
    .navs{
        width: 100px;
        height: 100px;
        margin: 30px;
        display: inline-block;
        position: relative;
    }
    .nav-delete{
        position: absolute;
        text-align: center;
        width: 100%;
        height: 25px;
        line-height: 25px;
        background-color: #d6d1d5;
        opacity: 0.8;
        cursor: pointer;
        top: 75px;
        border-radius: 5px;
    }
    .flashs,.youlikes{
        width: 120px;
        height: 150px;
        margin: 30px;
        display: inline-block;
        position: relative;
    }
    .flash-delete,.youlike-delete{
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