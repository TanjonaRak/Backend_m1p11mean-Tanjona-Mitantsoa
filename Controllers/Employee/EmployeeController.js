

const { getClient } = require('../../Utility/db');
const EmployeeModel = require('../../models/Employe/Employee');

class EmployeeController {

    async SaveEmployee(req,res){
        try {
            // console.log(req)
            const employee = {...req.body}
            // console.log(employee)
            const Emp = await EmployeeModel.SaveEmployee(employee);
           if(Emp!==null){
            res.status(200).send({Emp,status:200});
           }else{
            res.send({message:"Mail is not valid",status:500})
           }
            
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }

    async getEmployee (req,res){
        let client = null;
        try {
            let offset = req.params._offset;
            let limit = req.params._limit
            client = await getClient();
            let db = client.db(process.env.DB_NAME); 
            const data = await EmployeeModel.getEmployee(db,offset,limit);
            const lineNumber = await EmployeeModel.getLigneNumber(db,limit);
            res.status(200).send({data,status:200,message:"request success",lineNumber:lineNumber});
        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }finally{
            if (client!=null) {
                client.close();
            }
        }
    }

    // async UpdateEmployee(){
    async UpdateEmployee(req,res){  
        let client = null;
        try {
            // let _id = req.params._id
            client = await getClient();
            let db = client.db(process.env.DB_NAME); 
            let emp_update = {...req.body};
            const data_update = await EmployeeModel.UpdateEmployee(emp_update,db);
            if(data_update !==null){
                res.status(200).send({emp_update,status:200,message:"request success"});
            }
            // res.status(200).send({data_update,status:200,message:"request success"});
            // res.send({message:,status:500})
        } catch (error) {
            console.log(error.message)
            res.send({message:error.message,status:500})
        }finally{
            if (client!=null) {
                client.close();
            }
        }
    }

    async getEmployeeById(req,res){
        try {
            let id = req.params._id;
            let profil = await EmployeeModel.getEmployeeById(id,null);
            res.status(200).send({profil,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
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