const express = require("express");
const router = require("express").Router();
const Item = require("../models/Item");
const Shop = require("../models/Shop");



router.post("/create", async (req,res) => {

    const shop = new Shop({
        seller: req.body.seller,
    });

    shop.save().then((shop) => {
            res.json({status:201, shop:shop})
        }).catch((err) => {
            res.json({status:400, message:err})
        })
})

router.route("/:shop_id/items").get((req,res) => {
    const shopId = req.params.shop_id;
    Item.find({'shop': shopId} ).then((items) => {
        res.json({items});
    }).catch((err) => {
        res.json({err});
    })
})

router.route("/seller/:id").get((req,res) => {
    const sellerId = req.params.id;
    Shop.find({'seller': sellerId} ).then((shop) => {
        res.json({shop});
    }).catch((err) => {
        res.json({err});
    })
})

module.exports = router;