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
            const appointment = await AppointmentModel.getDataAppointment();
            res.send({ "status": true, "data":appointment});
        } catch (error) {
            res.status(500).send("error");
        }
       
    }
}
module.exports = new AppointmentController();