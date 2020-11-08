import mongoose from 'mongoose'
let userSchema = mongoose.Schema({
    username:{type:String,required:true},
    userphone:{type:String,required:true}
});
const User = mongoose.model('User',userSchema);
export default User;