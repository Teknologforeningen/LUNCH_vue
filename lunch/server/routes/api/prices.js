const express = require('express');
const Price = require('../../../models/Price');

const router = express.Router();

router.get('/', (req, res) => {
    Price.find({}, (err, prices) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.send(prices);
        }
    });
});

router.post('/', (req, res) => {
    const price = JSON.parse(req.body.text);
    Price.findOne({ _id:price._id }, (err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else if (result) {
            //console.log("exists");
            result.description = price.description;
            result.priceStudent = price.priceStudent;
            result.priceNormal = price.priceNormal;
            result.save();
        } else {
            //console.log("does not exist")
            const newPrice = new Price({
                description: price.description,
                priceStudent: price.priceStudent,
                priceNormal: price.priceNormal
            });
            
            newPrice.save(err => {
                if (err) {
                    return res.status(500).json({
                        title: 'server error',
                        error: err
                    });
                } else {
                    res.status(201).send();
                }
            });
        }
    });    
});

router.delete('/:id', (req, res) => {
    Price.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).json({
                title: 'server error',
                error: err
            });
        } else {
            res.status(201).send();
        }
    });
});

module.exports = router;