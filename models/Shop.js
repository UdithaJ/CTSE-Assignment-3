const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const shopSchema = new Schema({

    seller: {
        type: String,
        required: true
    },
})

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;