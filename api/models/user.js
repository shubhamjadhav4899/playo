const mongoose = require('mongoose');
const userSchema =new mongoose.Schema({
    clerkId:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String},
    image:{type:String,required:true},
    skill:{type:String,required:true},
    noOfGame:{type:Number,required:true},
    playpals:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    sports:[String],
    provider:String,

},{
    timestamps:true
})

const User =mongoose.model.User || mongoose.model('User',userSchema);

module.exports=User;