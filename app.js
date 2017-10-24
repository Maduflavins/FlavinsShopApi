var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
products = require('./models/products'), 
WishList = require('./models/wishlist');
var db = mongoose.connect('mongodb://localhost/flavins-shop');







app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




app.listen(3000, function(){
    console.log("server is started");
})