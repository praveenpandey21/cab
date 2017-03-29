var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST


    //Any requests to this controller must pass through this 'use' function
    //Copy and pasted from method-override
    //router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var cabSchema = mongoose.Schema({

    cabrdriverName: String,
    cabrcarName: String,
    cabrcarNumber: String,
    cabrcarType: String
});

var Cab = mongoose.model('Cab', cabSchema, 'cab');

//Movie
router.get('/getCabr', function(req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Cab.find({}, function(err, docs) {
        res.json(docs);

    });
});

router.get('/getCabr/:id', function(req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER for cab register");
    Cab.find({ _id: req.params.id }, function(err, docs) {
        res.json(docs);

    });
});

router.post('/addCabr', function(req, res) {
    console.log(req.body);


    var driverName = req.body.cabrdriverName;
    var carName = req.body.cabrcarName;
    var carNumber = req.body.cabrcarNumber;
    var carType = req.body.cabrcarType;
    var cab = new Cab({

        cabrdriverName: driverName,
        cabrcarName: carName,
        cabrcarNumber: carNumber,
        cabrcarType:carType
    });

    cab.save(function(err, docs) {
        if (err) throw err;
        console.log("Book Saved Successfully");
        res.json(docs);
    });

})

router.delete('/deleteCabr/:id', function(req, res) {
    console.log("REACHED Delete FUNCTION ON SERVER for cab register");
    Cab.remove({ _id: req.params.id }, function(err, docs) {
        res.json(docs);
    });
})

router.put('/updateCabr/:id', function(req, res) {
    console.log("REACHED PUT of cab register");
    console.log(req.body);
    Cab.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, data) {
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
