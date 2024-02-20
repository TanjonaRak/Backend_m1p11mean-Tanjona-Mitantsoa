const Appointment = require('../../models/Appointment/Appointment');
const db = require('../../Utility/db');

class AppointmentController {

    async SaveAppointment (req,res){
        
        const cust = {...req.body}

       var status = await Appointment.SaveAppointment(cust);
       console.log(status);
       if(status){
            res.send({"status":true, "message": "Appointment created successfuly"});
       }
       else{
            res.send({"status":false, "message": "Error creating appointment"});
       }
    }

    async getDataAppointment (req,res){
        try {
            const appointment = await Appointment.getAppointment();
            res.send({ "status": true, "data":appointment});
        } catch (error) {
            res.status(500).send("error");
        }
       
    }

    async sendEmail (req,res){
         let customer = req.body;
         Appointment.sendEmail(customer, info => {
            console.log("The email has beed send id ${customer.id}");
            res.send(info);
         });
    }
}
module.exports = new AppointmentController();