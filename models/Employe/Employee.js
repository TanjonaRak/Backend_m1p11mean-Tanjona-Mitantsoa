const mongoose = require('mongoose');
const { Schema } = require('mongoose');

class Employee {

    employee = new Schema({
        name : {type:String,required : true},
        first_name : {type:String , required :true},
        login : {type:String , required :true},
        email :{type:String , required :true},
        password : {type:String , required :true},
        etat : {type:Number},
        service : {type : Array }
    })
    
    EmployeModel = mongoose.model('employee',this.employee);

    /*
        {
            "name" :"RAKOTO",
            "first_name" : "ROBERT",
            "login" : "LOGIN",
            "email":"tanjona@gmail.com",
            "password" : "1234",


        }
    */

    constructor (){
        this.employee.name = "name"
    }

    async SaveEmployee (employee){
        try {
            console.log(employee)
            const newEmp = new this.EmployeModel(employee);
            const employee_Save = await newEmp.save();
            return employee_Save;
        } catch (error) {
            throw error;
        }
    }

    async getEmployee(db,search){
        try {
            let result = await db.collection('employee').find({}).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async UpdateEmployee (employee,_id){
        try {
            
        } catch (error) {
            
        }
    }

    async DeleteEmployee(_id){
        try {
            
        } catch (error) {
            
        }
    }


    
}

module.exports = new Employee();