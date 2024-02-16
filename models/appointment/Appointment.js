const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
const Customer = require('../Customer/Customer');
const Service = require('../Service/Service');
const { employee } = require('../Employe/Employee');

class Appointment {

    appointment = new Schema({
        _id : {type:String,required : true},
        customer: {type:Customer,required : true},
        service:{type:Service,required : true},
        employee :{type:employee,required : true},
        dateAppointment :  {type:Date,required : true},
        hours : {type:String,required : true},
        etat :  {type:Number,required : true},
        date_create :  {type:Date,required : true}
    })

}