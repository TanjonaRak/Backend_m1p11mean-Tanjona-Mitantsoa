

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
            const data = await EmployeeModel.getEmployee(null);
            res.status(200).send({data,status:200,message:"request success"});
        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }

    }

    async UpdateEmployee(res,req){

    }
} 

module.exports = new EmployeeController();