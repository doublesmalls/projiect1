import mongoose from 'mongoose'
let navSchema = mongoose.Schema({
    icon_url:{type:String,required: true},
    public_name:{type:String,required:true}
});
const Nav = mongoose.model('Nav',navSchema);
export default Nav;