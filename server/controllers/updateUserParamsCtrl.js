let express = require('express');
let User = require('../models/userModel.js'); //Uppercase User is user model and lowercase user is user attached to the req object
let UserParams = require('../models/userParams.js');
let router = express.Router();
let currentTemp, currentPulse;
router.post('/', function (req, res, next) {
    if (!req.body.userId) {
        return res.status(400).send("please send userId of user whose temperature and pulse needs to to be set as a json field 'userId' ");
    }

    User.findById(req.body.userId, function (err, reqUser) {
        if (err) {
            return next(err);
        }
        if (!reqUser) {
            return res.status(400).send("please check the userId provided. Either the user doesnt exist or may have been removed.");
        }

        if (!req.body.temperature && !req.body.pulse) {
            return res.status(400).send("Please send pulse or temperature or both as json fields 'temperature' and 'pulse' ");
        }

            if(req.body.pulse){
                 reqUser.currentPulse = req.body.pulse;
            }

            if(req.body.temperature){
                reqUser.currentTemp = req.body.temperature;
           }

        reqUser.save(function (err,final) {
            if (err) {
                return next(err);
            }
            res.send('Params updated successfully');// retur response but proceed to save updaed value in user Params table
            let newUserParamsRecord = new UserParams({  //default values assigned for fields if not provided
                userId: reqUser.id,
            });
            if (req.body.pulse) {
                newUserParamsRecord.pulse = req.body.pulse;
            }
            if (req.body.temperature) {
                newUserParamsRecord.temperature = req.body.temperature;
            }
            newUserParamsRecord.save(function (err, result) {
                if (err) {
                    cosole.log('Something went wrong in trying to save user params. Not a critical error as its a data dump table but worth investigating');
                }
                return console.log('User param saved successfully');
            });
        });
    });


});
module.exports = router;

//