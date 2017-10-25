var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
products = require('./models/products'), 
WishList = require('./models/wishlist');
var db = mongoose.connect('mongodb://localhost/flavins-shop');






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(request, response){
    var product = new products();
    product.title = request.body.title;
    product.price = request.body.price;
    product.save(function(err, savedProduct){
        if(err){
            response.status(500).send({error:"could not save product"});

        }else{
            response.status(200).send(savedProduct);
        }
    })
});

app.get('/product', function(request, response){
    products.find({}, function(err, products){
        if(err){
            response.status(500).send({error:"could not fetch products"});

        }else{
            response.status(200).send(products);
        }

    })
})



app.listen(3000, function(){
    console.log("server is started");
})