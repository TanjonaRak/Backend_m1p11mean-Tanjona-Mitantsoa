const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
require('dotenv').config();

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

    async getEmployee(db,offset,limit){
        let client = null;
        let db_test = 0;
        console.log(offset)
        console.log(limit)
        try {
            if(db == null){
                db_test = 1;
                client = await getClient();
                db = client.db(process.env.DB_NAME); 
            }
            let result = await db.collection('employees').find({}).skip(Number(offset)).limit(Number(limit)).toArray();
            return result;
        } catch (error) {
            throw error;
        }finally {
            if (db_test != 0 && client!=null) {
                client.close();
            }
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