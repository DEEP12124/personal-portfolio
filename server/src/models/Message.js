import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
  name: {type:String, required:true, trim:true, minlength:2, maxlength:80},
  email: {type:String, required:true, trim:true, lowercase:true, maxlength:254, match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/},
  message: {type:String, required:true, trim:true, minlength:10, maxlength:5000},
}, {timestamps:true, versionKey:false});
messageSchema.index({createdAt:-1});
export default mongoose.models.Message || mongoose.model('Message', messageSchema);
