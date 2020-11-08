import mongoose from 'mongoose'
let detailSchema = mongoose.Schema({
    small_image:{type:String,required: true},
    name:{type:String,required:true},
    spec:{type:String,required:true},
    price:{type:Number,required:true}
});
const Detail = mongoose.model('Detail',detailSchema);
export default Detail;