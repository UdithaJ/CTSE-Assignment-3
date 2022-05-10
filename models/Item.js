const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const itemSchema = new Schema({

    shop: {
        type: Schema.Types.ObjectId, ref: 'Shop',
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'Category',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },

})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;