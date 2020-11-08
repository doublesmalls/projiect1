import mongoose from 'mongoose'
let flashSchema = mongoose.Schema({
    small_image:{type:String,required: true},
    name:{type:String,required:true},
    origin_price:{type:Number,required:true},
    price:{type:Number,required:true},
    num:{type:Number,required:true}
});
const Flash = mongoose.model('Flash',flashSchema);
export default Flash;