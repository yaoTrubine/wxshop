import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
    token: {
        type : String,
        required : true
    },
    goodsJsonStr: {
        type : Object,
        required : true
    },
    remark : {
        type : String
    }
});

export default mongoose.model('Order', OrderSchema);