import mongoose from 'mongoose'
let descSchema = mongoose.Schema({
    descWord:{type:String,required: true}
});
const Desc = mongoose.model('Desc',descSchema);
export default Desc;