var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST


    //Any requests to this controller must pass through this 'use' function
    //Copy and pasted from method-override
    //router.use(bodyParser.urlencoded({ extended: true }))


    var mongoose = require('mongoose');

var driverSchema = mongoose.Schema({

    drivName: String,
    drivAge: String,
    drivGender: String,
    drivPhone: String,
    drivLiscence: String
});

var Driver = mongoose.model('Driver', driverSchema, 'driver');


router.get('/getDriv', function(req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Driver.find({}, function(err, docs) {
        res.json(docs);

    });
});

router.get('/getDriv/:id', function(req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    Driver.find({ _id: req.params.id }, function(err, docs) {
        res.json(docs);

    });
});

router.post('/addDriv', function(req, res) {
    console.log(req.body);


    var driverName = req.body.drivName;
    var Age = req.body.drivAge;
    var gender = req.body.drivGender;
    var phone = req.body.drivPhone;
    var liscence = req.body.drivLiscence;

    var driver = new Driver({

        drivName: driverName,
        drivAge: Age,
        drivGender: gender,
        drivPhone: phone ,
        drivLiscence:liscence

    });

    driver.save(function(err, docs) {
        if (err) throw err;
        console.log("driver Saved Successfully");
        res.json(docs);
    });

})

router.delete('/deleteDriv/:id', function(req, res) {
    console.log("REACHED Delete FUNCTION ON SERVER for driver");
      Driver.remove({ _id: req.params.id }, function(err, docs) {
        res.json(docs);
    });
});

router.put('/updateDriv/:id', function(req, res) {
    console.log("REACHED PUT of driver");
    console.log(req.body);
    Driver.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, data) {
        console.log(data);
        res.json(data);
    });
});


// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;
