var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var cart = new Schema({
    title: {type: String, default: "nothing in your cart"},
    products: [{type: ObjectId, ref: 'Product'}]
})

module.exports = mongoose.model('Cart', cart);