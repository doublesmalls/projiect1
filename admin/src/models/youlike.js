import mongoose from 'mongoose'
let youlikeSchema = mongoose.Schema({
    small_image:{type:String,required: true},
    name:{type:String,required:true},
    origin_price:{type:Number,required:true},
    price:{type:Number,required:true}
});
const Youlike = mongoose.model('Youlike',youlikeSchema);
export default Youlike;