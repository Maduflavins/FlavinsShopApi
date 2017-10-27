var express = require('express'),
router = express.Router(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
products = require('../models/products'), 
WishList = require('../models/wishlist'),
Cart     = require('../models/carts');


var db = mongoose.connect('mongodb://localhost/flavins-shop');



router.post('/product', function(request, response){
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

router.get('/wishlist', function(request, response){
    WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, wishLists){
        if(err){
            response.status(500).send({error:"could not fetch wishlist"});
        }else{
            response.status(200).send(wishLists);

        }
    })
})
    

router.get('/product', function(request, response){
    products.find({}, function(err, products){
        if(err){
            response.status(500).send({error:"could not fetch products"});

        }else{
            response.status(200).send(products);
        }

    })
})

router.post('/wishlist', function(request, responds){
    var wishList = new WishList();
    wishList.title = request.body.title;

    wishList.save(function(err, newWishList){
        if(err){
            responds.status(500).send({error: "can not create a new wish list"})
        }else{
            responds.send(newWishList);
        }
    })
})
router.put('/wishlist/product/add', function(request, response){
    Product.findOne({id: request.body.productId}, function(err, product){
        if(err){
            response.status(500).send({error:"could not add item to the wishlist"});
        }else{
            WishList.update({_id:request.body.wishListId}, {$addToSet:{products: product._id}}, function(err, wishList){
                if(err){
                    response.status(500).send({error:"could not add item to wishlist"});
                }else{
                    response.send(wishList);
                }
            })
        }
    })
})

/*Shopping Cart*/

router.put('/cart/product/add', function(request, response){
    var cart = new Cart();
    Product.findOne({id: request.body.productId}, function(err, product){
        if(err){
            response.status(500).send({error:"could not fetch product"});
        }else{
            cart.update({_id:request.body.cartId}, {$addToSet:{products: product._id}}, function(err, cart){
                if(err){
                    response.status(500).send({error:"could not add item to cart"});
                }else{
                    response.send(cart);
                }
            })
        }
    })
})


module.exports = router;