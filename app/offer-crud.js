var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST


    //Any requests to this controller must pass through this 'use' function
    //Copy and pasted from method-override
    //router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var offerSchema = mongoose.Schema({

    CrType: String,
    Basefare : String,
    Perkm: String

});

var Offer = mongoose.model('Offer', offerSchema, 'offer');


router.get('/getOfer', function(req, res) {
    console.log("REACHED GET offer");
     Offer.find({}, function(err, docs) {
        res.json(docs);

    });
});

router.get('/getOfer/:id', function(req, res) {
    console.log("REACHED GET  offer by id");
     Offer.find({ _id: req.params.id }, function(err, docs) {
        res.json(docs);

    });
});

router.post('/addOfer', function(req, res) {
    console.log(req.body);
    console.log("inside offer post");


    var carType = req.body.crType;
    var baseFare = req.body.Basefare;
    var perKm = req.body.Perkm;


    var offrs = new  Offer({
      CrType: carType,
      Basefare :  baseFare,
      Perkm:perKm
      });

    offrs.save(function(err, docs) {
        if (err) throw err;
        console.log("offer Saved Successfully"+docs);
        res.json(docs);
    });

})

router.delete('/deleteOfer/:id', function(req, res) {
    console.log("REACHED Delete offer"+res);
     Offer.remove({ _id: req.params.id }, function(err, docs) {
        res.json(docs);
    });
})

router.put('/updateOfer/:id', function(req, res) {
    console.log("REACHED update offer");
    console.log(req.body);
     Offer.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, data) {
        console.log(data);
        res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;
