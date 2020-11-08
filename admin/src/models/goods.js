import mongoose from 'mongoose'
let goodsSchema = mongoose.Schema({
    goods_id:{type:String,required: true},
    goods_name:{type:String,required:true},
    goods_price:{type:Number,required:true},
    small_image:{type:String,required:true},
    user_id:{type:String,required:true},
    num:{type:Number,required:true},
    checked:{type:Boolean,required:true}
});
const Goods = mongoose.model('Goods',goodsSchema);
export default Goods;