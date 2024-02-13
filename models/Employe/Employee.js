const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
require('dotenv').config();
const { ObjectId } = require('mongoose').Types;

class Employee {

    employee = new Schema({
        name : {type:String,required : true},
        first_name : {type:String , required :true},
        login : {type:String , required :true},
        email :{type:String , required :true},
        password : {type:String , required :true},
        etat : {type:Number},
        service : {type : Array },
        time_between : {type : String},
        end_time : {type :String},
        date_create : {type:Date},
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
            // console.log(employee)
            const newEmp = new this.EmployeModel(employee);
            newEmp.date_create = new Date();
            const employee_Save = await newEmp.save();
            return employee_Save;
        } catch (error) {
            throw error;
        }
    }

    async getEmployee(db,offset,limit){
        let client = null;
        let db_test = 0;
        // console.log(offset)
        // console.log(limit)
        try {
            if(db == null){
                db_test = 1;
                client = await getClient();
                db = client.db(process.env.DB_NAME); 
            }
            let result = await db.collection('employees').find({}).sort({_id:-1}).skip(Number(offset)).limit(Number(limit)).toArray();
            return result;
        } catch (error) {
            throw error;
        }finally {
            if (db_test != 0 && client!=null) {
                client.close();
            }
        }
    }

    async getLigneNumber(db,limit){
        try {
            let result = await db.collection('employees').find({}).toArray();
            return parseInt(((result.length/limit) + 1));
        } catch (error) {
            throw error;
        }
    }

    async UpdateEmployee (employee,id,db){
        let client = null;
        let db_test = 0;

        try {
            const newEmp = new this.EmployeModel(employee);
            // let result = newEmp.save();
            if(db == null){
                db_test = 1;
                client = await getClient();
                db = client.db(process.env.DB_NAME); 
            }    
            let result  = await db.collection('employees').updateOne(
            {_id :new ObjectId(employee._id)},
            {$set:{
                name:newEmp.name,
                first_name : newEmp.first_name,
                email : newEmp.email,
                password : newEmp.password,
                login : newEmp.login,
                service : newEmp.service,
                date_last_update : new Date(),
                time_between : newEmp.time_between,
                end_time : newEmp.end_time
                
            }});
            return result;

        } catch (error) {
            throw error;
        }finally {
            if (db_test != 0 && client!=null) {
                client.close();
            }
        }
    }

    async DeleteEmployee(_id){
        try {
            
        } catch (error) {
            
        }
    }

    


    
}

module.exports = new Employee();