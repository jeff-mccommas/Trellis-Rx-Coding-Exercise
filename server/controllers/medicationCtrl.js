
let express = require('express');
let Medication = require('../models/medication.js');
let User = require('../models/userModel.js');
let router = express.Router();


router.get('/', function(req,res,next){
  Medication.find({},function(err,medications){
    if(err) {
      return next(err);
    }
    return res.send(medications);
  });
});

router.post('/', function(req,res,next){
  if(req.body && req.body.userId && req.body.medName && req.body.dose){
    let newMed = new Medication(req.body);
    newMed.save(function(err,newMedRecord){
      if(err){
        return next(err);
      }
      //adding reference of medication added in users medications array
      User.update(
				{ _id: req.body.userId },
				{ $push: { medications: newMedRecord._id } },
				function(err,result){
					if(err){
						return next(err);
				}
				return res.send('Med saved successfully');
		});
	});
} else {
    return res.status(400).send("incorrect medication object. Please send med name, dose and userId for whom to set medication");
  }
});

module.exports = router;