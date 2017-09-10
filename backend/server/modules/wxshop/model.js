import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: Array
    }
});

export default mongoose.model('Product', ProductSchema);