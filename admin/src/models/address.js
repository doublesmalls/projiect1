import mongoose from 'mongoose'
let addressSchema = mongoose.Schema({
    user_id:{type:String,required:true},
    address_name:{type:String,required:true},
    address_phone:{type:String,required:true},
    address_area:{type:String,required:true},
    province:{type:String,required:true},
    city:{type:String,required:true},
    county:{type:String,required:true},
    areaCode:{type:String,required:true},
    address_detail:{type:String,required:true},
    post_code:{type:String,required:true},
    address_tag:{type:String,required:true}, //是否为默认地址
});
const Address = mongoose.model('Address',addressSchema);
export default Address;