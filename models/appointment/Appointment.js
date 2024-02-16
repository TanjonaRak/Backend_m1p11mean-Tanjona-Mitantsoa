const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
const Customer = require('../Customer/Customer');
const Service = require('../Service/Service');
const  Employee  = require('../Employe/Employee');


class Appointment {

     appointment = new Schema({
        _id: { type: String, required: true },
        customer: { type: Schema.Types.ObjectId, ref: 'Customers', required: true },
        service: { type: Schema.Types.ObjectId, ref: 'Services', required: true },
        employee: { type: Schema.Types.ObjectId, ref: 'Employees', required: true },
        dateAppointment: { type: Date, required: true },
        hours: { type: String, required: true },
        etat: { type: Number, required: true },
        date_create: { type: Date, required: true }
    });
    
    constructor (){  
          this.appointment.name = "name";
      }
    AppointmentModel = mongoose.model('appointment',this.appointment);

    async SaveAppointment (appointment){
        try {
          
            const newAppointment = new this.AppointmentModel(appointment);
            const save_appointment = await newAppointment.save();
            return save_appointment;
        } catch (error) {
            throw error;
        }
    }

    async getAppointment (){
        let client = null;
        let db = null;
        try {
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            let appointmentArray = await db.collection('appointments').find({}).toArray();
            return appointmentArray;
        } catch (error) {
            throw error;
        }
    }
 
}

module.exports = new Appointment();