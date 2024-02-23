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
           throw error;
        }
       
    }

    async getEmpAvailable (req, res){
        try {
            const empAvalaible = await Appointment.getEmpAvailable(req.body);   
            res.send({"status":true, "message": empAvalaible});
        } catch (error) {
            res.send({"status":false, "message": error.message});
        }
    }

    async getAvailableTime (req,res){
        try {
            const availableTime = await Appointment.getAvailableTime(req.body);
            res.send({"status":true, "message": availableTime});
         } catch (error) {
            res.send({"status":false, "message": error.message});
        }
    }

    async compareTimeService (req,res){
        try {
            let result = await Appointment.compareTimeService(req.body);
            
            res.send({"status":true, "message": result});
        } catch (error) {
            res.send({"status":false, "message": error.message});
        }
    }
}
module.exports = new AppointmentController();