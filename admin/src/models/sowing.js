import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/shop',{useNewUrlParser:true});
mongoose.connection.on('open',()=>{
    console.log("连接数据库成功")
});
mongoose.connection.on('error',()=>{
    console.log("数据库连接失败")
});
let sowingSchema = mongoose.Schema({
    icon_url:{type:String,required: true},
    puclic_name:{type:String,required:true}
});
const Sowing = mongoose.model('Sowings',sowingSchema);
export default Sowing;