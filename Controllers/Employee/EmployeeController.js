

const EmployeeModel = require('../../models/Employe/Employee');

class EmployeeController {

    async SaveEmployee(req,res){
        try {
            // console.log(req)
            const employee = {...req.body}
            console.log(employee)
            const Emp = await EmployeeModel.SaveEmployee(employee);
            res.status(200).send({Emp,status:200});
        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }
    }

    async getEmployee (req,res){
        try {
            let offset = req.params._offset;
            let limit = req.params._limit
            const data = await EmployeeModel.getEmployee(null,offset,limit);
            res.status(200).send({data,status:200,message:"request success"});
        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }

    }

    async UpdateEmployee(){

    }
    async getAppointmentEmp (req,res){
        try {
            let emp =  {...req.body};
            let result = await EmployeeModel.AppointmentEmp(emp);
            res.send({"status":200, "data": result,"message":"Request Success"});
            
        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }
    }
    async getNbrAppointmentPerDayPerMonth (req,res){
        try {

            let year = req.params.year;
            let month = req.params.month;
            let result = await EmployeeModel.NbrAppointmentPerDayPerMonth(year,month);
            res.send({"status":200, "data": result,"message":"Request Success"});

        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }
    }
} 

module.exports = new EmployeeController();