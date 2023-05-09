const express = require('express');
const router = express.Router();


const Items = require('../models/item');

router.get('/', async (req, res) => {
    operation = req.query.operation;
   console.log(operation)

    if(operation == undefined){
        res.render("testPage")
    }
    else if(operation == "fetchAll"){
        res.json(await Items.find({}));
    }
    else if(operation == "getKeys"){
        res.json(Object.keys(Items.schema.obj));
    }
    else if(operation == "orderItems"){
        const key = req.query.key;
        const order = req.query.order;
        res.json(await Items.find({}).sort({[req.query.key] : req.query.order}));
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const item = new Items({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            ageRequirement : req.body.ageRequirement,
            quantity : req.body.quantity
        });

        console.log(item)

        const newItem = await item.save();
        //201 is a success, something was created
        res.status(201).json(newItem);
    } catch (err) {
        //400 is a user error, they sent in bad data
        res.status(400).json({ message: err.message });
    }

});

module.exports = router;