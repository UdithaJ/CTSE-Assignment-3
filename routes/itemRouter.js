const express = require("express");
const router = require("express").Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Item = require("../models/Item");
const Category = require("../models/Category")

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: function (req, file, callback){
        const imageID = uuidv4();
        const uploadName = imageID+file.originalname;
        callback(null, uploadName);
    }
});

const upload = multer({storage:storage});

router.post("/add", upload.single('image'), async (req,res) => {

    const item = new Item({
        shop: req.body.shop,
        category:req.body.category,
        title : req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        image: req.file.filename,
        price:req.body.price,
        status: req.body.status
    });

    item.save().then((item) => {
        res.json({status:201, item:item})
    }).catch((err) => {
        res.json({status:400, message:err})
    })
})

router.put("/update/:id", upload.single('image'), async (req,res) => {

    const updatedItem = {
        category:req.body.category,
        title : req.body.title,
        description: req.body.description,
        quantity: req.body.quantity,
        price:req.body.price,
        status: req.body.status
    };

    console.log(req.body)

    if(req.file) {
        updatedItem.image = req.file.filename;
    }

    const itemId = req.params.id;
    let item = await Item.findOne({_id: itemId});

    await Item.findByIdAndUpdate(itemId,updatedItem).then((item) => {
        res.json({status:200, item:item})
    }).catch((err) => {
        res.json({status:400, message:err})
    })

})

router.route("/categories").get((req,res) => {
    Category.find().then((categories) => {
        res.json({categories});
    }).catch((err) => {
        res.json({err});
    })
})

router.route("/:id").get(async (req, res) => {
    const itemId = req.params.id;
    await Item.findOne({_id: itemId}).populate('category').populate('shop').then((item) => {
        res.json({item});
    }).catch((err) => {
        res.json({err});
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    const itemId = req.params.id;
    await Item.findByIdAndDelete(itemId).then(() => {
        res.json({status:200, message:'successfully deleted'})
    }).catch((err) => {
        res.json({err});
    })
})

module.exports = router;