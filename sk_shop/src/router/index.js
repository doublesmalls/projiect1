import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//引入组件
import databorad from './../views/databorad/databorad'
const home = ()=>import('./../views/home/home');
const cart = ()=>import('./../views/cart/cart');
const category = ()=>import('./../views/category/category');
const mine = ()=>import('./../views/mine/mine');
const UserCenter = ()=>import('./../views/mine/children/UserCenter');
const Login = ()=>import('./../views/login/Login');
const Back = ()=>import('../../back/views/dataBox');

//引入组件相关
const Order = ()=>import('./../views/order/Order');
const myAddress = ()=>import('./../views/order/children/myAddress');
const AddAddress = ()=>import('./../views/order/children/children/addAddress');
const EditAddress = ()=>import('./../views/order/children/children/editAddress');
const Sowing = ()=>import('../../back/views/components/sowings');
const Cart = ()=>import('../../back/views/components/carts');

export default new Router({
    routes:[
        {
            path:'/',redirect:'/databorad'
        },
        {
            path:'/databorad',
            name:'databorad',
            component:databorad,
            redirect:'/databorad/home',
            children:[
                {path:'home' , name:'home' , component:home,meta:{keepAlive:true}},
                {path:'cart' , name:'cart' , component:cart},
                {path:'category' , name:'category' , component:category,meta:{keepAlive:true}},
                {path:'mine' ,
                    name:'mine' ,
                    component:mine,
                    children:[{path:'userCenter',name:'userCenter',component:UserCenter}]//用户中心
                },
            ]
        },
        {
            path:'/back',name:'dataBox',component:Back,
            redirect:'/back/sowing',
            children:[
                {path:'sowing',name:'sowing',component:Sowing},
                {path:'cart',name:'cart',component:Cart},
            ]
        },
        {
            path:'/confirmOrder',
            name:'order',
            component:Order,
            children: [
                {   path:'myAddress',
                    name:'myAddress',
                    component:myAddress,
                    children:[
                        {path:'addAddress',name:'addAddress',component:AddAddress},
                        {path:'editAddress',name:'editAddress',component:EditAddress}
                    ]
                }
            ]
        },
        {path:'/login',name:'login',component:Login}
    ]
})