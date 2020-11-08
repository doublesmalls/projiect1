<template>
    <swiper id="swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(sowing,index) in sowing_list" :key="sowing.puclic_name">
            <img :src="require(`../../../../../../admin/src/public/uploads/${sowing.icon_url}`)" :alt="sowing.puclic_name">
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    import 'swiper/dist/css/swiper.css'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "sowing",
        data(){
            return{
                swiperOption: {
                    notNextTick:true,
                    pagination:{
                        el:'.swiper-pagination',
                        clickable:true
                    },
                    loop:true,
                    autoplay:{
                        delay:1000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    },
                    speed:600,
                    on:{
                        slideChangeTransitionEnd(){
                        }
                    }
                }
            }
        },
        created(){
          this.log();
        },
        props:{
            sowing_list:Array
        },
        computed:{
            swiper(){
                return this.$refs.mySwiper.swiper;
            }
        },
        mounted(){
        },
        components: {
            swiper,
            swiperSlide
        },
        methods:{
            log(){
                console.log(this.sowing_list);
            }
        }
    }
</script>

<style scoped>
    #swiper{
        width: 100%;
        height: 200px;
        background-color: black;
    }
    img{
        width: 100%;
        height: 100%;
    }

</style>