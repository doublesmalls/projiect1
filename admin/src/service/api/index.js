import ajax from './ajax'

//定义基础路径
const Base_Url = '/api';

//获取轮播图数据
export const getSowingdata = ()=>ajax(Base_Url + '/sowing');
//删除轮播图数据
export const deleteSowingdata = (sowingId)=>ajax(Base_Url + '/sowing/deletesowing/'+sowingId);


//获取导航数据
export const getNavdata =()=>ajax(Base_Url + '/nav');
//删除导航数据
export const deleteNavdata = (navId)=>ajax(Base_Url + '/nav/deletenav/'+navId);


//获取抢购数据
export const getFlashdata = ()=>ajax(Base_Url + '/flash');
//删除抢购数据
export const deleteFlashdata = (flashId)=>ajax(Base_Url + '/nav/deleteflash/'+flashId);

//获取喜欢数据
export const getYoulikedata = ()=>ajax(Base_Url + '/youlike');
//删除喜欢数据
export const deleteYoulikedata = (youlikeId)=>ajax(Base_Url + '/nav/deleteyoulike/' + youlikeId);

//获取分类数据
export const getDescdata = ()=>ajax(Base_Url+'/desc');
//删除分类数据
export const deleteDescdata = (descId)=>ajax(Base_Url + '/desc/deletedesc/' + descId);

//获取细节数据
export const getDetaildata = ()=>ajax(Base_Url +'/detail');
//删除细节数据
export const deleteDetaildata=(detailId)=>ajax(Base_Url+'/detail/deletedetail/'+detailId);


//获取短信验证码
export const getPhoneCode = ()=>ajax('/api/message');

//手机验证码登录
export const getPhoneCodeLogin = (phone,code)=>ajax(Base_Url+'/phoneLogin/'+phone+'/'+code);

//增加商品信息
export const addGoodsToCart = (goods_id,goods_name,goods_price,small_image,user_id,num)=>ajax(Base_Url + '/addGoods/'+goods_id+'/'+goods_name+'/'+goods_price+'/'+small_image+'/'+user_id+'/'+num);

//获取当前用户的商品信息
export const getGoodsCart = (user_id) =>ajax(Base_Url+'/getGoods/'+user_id);

//修改购物车商品数量
export const changeCartNum = (user_id,goods_id,type) =>ajax(Base_Url+'/changeNum/'+user_id+'/'+goods_id+'/'+type);

//删除当前用户购物车商品信息
export const clearAllCart = (user_id) =>ajax(Base_Url+'/clearAll/'+user_id);

//单个商品的选中与取消选中
export const singer_select=(user_id,goods_id,checked)=>ajax(Base_Url+'/singer_select/'+user_id+'/'+goods_id+'/'+checked);

//全部商品的选中与取消选中
export const all_select=(user_id)=>ajax(Base_Url+'/all_select/'+user_id);



//获取用户当前地址
export const getUserAddress = (user_id)=>ajax(Base_Url +'/getAddress/'+user_id);


//添加新的地址
export const addNewAddress = (user_id,address_name,address_phone,address_area,province,city,county,areaCode,address_detail,post_code,address_tag)=>
    ajax(Base_Url +'/addNewAddress/'+user_id+'/'+address_name+'/'+address_phone+'/'+address_area+'/'+province+'/'+city+'/'+county+'/'+areaCode+
    '/'+address_detail+'/'+post_code+'/'+address_tag);


//编辑用户地址
export const changeAddress =(address_id,user_id,address_name,address_phone,address_area,province,city,county,areaCode,address_detail,post_code,address_tag)=>
    ajax(Base_Url+'/changeAddress/'+address_id+'/'+user_id+'/'+address_name+'/'+address_phone+'/'+address_area+'/'+province+'/'+city+'/'+county+'/'+areaCode+'/'+
    address_detail+'/'+post_code+'/'+address_tag);


//删除用户地址
export const deleteAddress = (address_id)=>ajax(Base_Url+'/deleteAddress/'+user_id);



//获取单条地址
export const getCurrentAddress = (user_id,address_id)=>ajax(Base_Url+'/getCurrentAddress/'+user_id+'/'+address_id);
