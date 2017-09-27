import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    openId:{
        type:String,
        unique : true
    },
    nickName:{
        type:String
    },
    gender:{
        type:Boolean
    },
    language:{
        type:String
    },
    city:{
        type:String
    },
    province:{
        type:String
    },
    country:{
        type:String
    },
    avatarUrl: {
        type:String
    }
})

export default mongoose.model('User', UserSchema);