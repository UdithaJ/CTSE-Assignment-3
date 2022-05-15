const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const shopSchema = new Schema({

    seller: {
        type: Schema.Types.ObjectId, ref: 'user',
        required: true,
    },
})

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;