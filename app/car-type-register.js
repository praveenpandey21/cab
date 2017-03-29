var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST


    //Any requests to this controller must pass through this 'use' function
    //Copy and pasted from method-override
    //router.use(bodyParser.urlencoded({ extended: true }))
  var mongoose = require('mongoose');
  var cartypeSchema = mongoose.Schema({
      cartype: String
    });

var CarType = mongoose.model('CarTypes', cartypeSchema, 'cartypes');

router.get('/getCrty', function(req, res) {
    console.log("REACHED GET of cartype");
    CarType.find({}, function(err, docs) {
        res.json(docs);
      });
})

router.get('/getCrty/:id', function(req, res) {
    console.log("REACHED GET of car type by id");
  CarType.find({ _id: req.params.id }, function(err, docs) {
        res.json(docs);

    });
})

router.post('/addCrty', function(req, res) {
    console.log(req.body);
    console.log("minside addCrty cartype");
    var crtype = req.body.crtyType;
    var crtyp = new CarType({
      cartype: crtype
});

    crtyp.save(function(err, docs) {
        if (err) throw err;
        console.log("cartype post Successfully");
        console.log(docs);
        res.json(docs);
    });

})

router.delete('/deleteCrty/:id', function(req, res) {
    console.log("REACHED Delete of cartype");
    console.log(res);
    CarType.remove({ _id: req.params.id }, function(err, docs) {
      console.log(docs);
        res.json(docs);
    });
})

router.put('/updateCrty/:id', function(req, res) {
    console.log("REACHED update of cartype");
    console.log(req.body);
    CarType.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, data) {
        console.log(data);
        res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    console.log(res);
    err.status = 404;
    next(err);
});

module.exports = router;
