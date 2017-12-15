var mongoose = require('mongoose');
var User = require('./userModel.js');
var Medication;
var MedicationSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,ref:'User',required:true},
    created:{type:Date,default:Date.now },
    medName:{type:String,required:true},
    startDate:{type:Date,default:Date.now},//if start date is not provided current date is taken as start date
    endDate:{type:Date},
    dose:{type:String,required:true}
});

       if(mongoose.models.Medication)
           Medication = mongoose.models.Medication;
       else
           Medication = mongoose.model('Medication',MedicationSchema);

module.exports = Medication;


