const Appointment = require('../../models/appointment/Appointment');
const db = require('../../Utility/db');

class AppointmentController {

    async SaveAppointment (req,res){
        
        const cust = {...req.body}
        // console.log(cust)
       var status = await Appointment.SaveAppointment(cust);
    //    console.log(status);
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
    async sendEmail (req,res){
         let customer = req.body;
         Appointment.sendEmail(customer, info => {
            console.log("The email has beed send id ${customer.id}");
            res.send(info);
         });
    }
    async getEmployeeByAppointment(req,res){
        try {
            let appointment = {...req.body};
            let result = await Appointment.getEmpPerHour(appointment);
            res.send({"status":200, "data": result,"message":"Request Success"});
        } catch (error) {
            res.send({"status":500, "message": error.message});
        }
    }
    async getAppointmentHistory (req,res){
        try {
            let customer = {...req.body};
            let result =  await Appointment.appointmentHistory(customer);
            res.send({"status":200, "data": result,"message":"Request Success"});
        } catch (error) {
            res.send({"status":500, "message": error.message});
        }
    }

    async getTaskByEmployee(req,res){
        try {
            let employee = req.body.employee;
            let dateTask = req.body.dateTask;
            let result = await Appointment.getTaskByEmployee(employee,dateTask);
            res.send({"status":200, "data": result,"message":"Request Success"});
        } catch (error) {
            res.send({"status":500, "message": error.message});
        }
    }
    async getTurnover (req,res){
        try {
            let year = req.params.year;
            let month = req.params.month;
            let result = await Appointment.turnover(year,month);
            res.send({"status":200, "data": result,"message":"Request Success"});
        } catch (error) {
            res.send({"status":500, "message": error.message});
        }
    }

    async UpdateTask(req,res){
        try {
            let id_task = req.params.id_task;
            let state = req.params.state;
            let result = await Appointment.UpdateTask(id_task,state);
            res.send({"status":200, "data": result,"message":"Request Success"});
        } catch (error) {
            res.send({"status":500, "message": error.message});
        }
    }
}
module.exports = new AppointmentController();