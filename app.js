var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
router = require('./routes/index'),
products = require('./models/products'), 
WishList = require('./models/wishlist')
Cart     = require('./models/carts');
var db = mongoose.connect('mongodb://localhost/flavins-shop');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));








app.listen(3000, function(){
    console.log("server is started");
})