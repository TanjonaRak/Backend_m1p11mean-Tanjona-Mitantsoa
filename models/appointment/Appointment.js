const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
const Customer = require('../Customer/Customer');
const Service = require('../Service/Service');
const  Employee  = require('../Employe/Employee');
const nodemailer = require("nodemailer");


class Appointment {

     appointment = new Schema({
        customer: { type: Object, required: true },
        service: { type: Object, required: true },
        employee: { type: Object, required: true },
        dateAppointment: { type: Date, required: true },
        hours: { type: String, required: true },
        etat: { type: Number, required: true },//0 RDV fait na oe efa vita // 1RDV annulena
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
    
    async  sendEmail (customer,callback){
        try {
            let transporter = nodemailer.createTransport({
                host : "smtp.gmail.com",
                port : 465,
                secure : true,
                auth :  {
                    customer : details.email,
                    pass : details.password
                }
            });
            let mailOptions = {
                from : '"process.env.USER_EMAIL"',//sender
                to : customer.email,
                subject : "Welcome in our beauty salon ",
                html : "<h1>Hi ${customer.name}</h1><h4></h4>"
                
            };
            let info = await transporter.sendMail(mailOptions);

            callback(info);

            return transporter;

        } catch (error) {
            console.log(error);
        }
     
    }
}

module.exports = new Appointment();