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
        email :{
            type:String , 
            required :true,
            unique:true
        },
        password : {type:String , required :true},
        etat : {type:Number},
        service : {type : Array },
        time_between : {type : String},
        end_time : {type :String},
        date_create : {type:Date},
        working_hours:{type:Object},
        picture:{type:String}
    })

    
    // unique:true,
    // validate:{
    //     validator:function(v){
    //         return /^([\w-]+.)+[\w-]{2,4})?$/.test(v);
    //     },
    //     message:props =>`${props.value} is not a mail valide !`
    // }


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

    async VerifyObject(employee){
        console.log(employee.email)
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(employee.email);  
    }

    async SaveEmployee (employee){
        try {
            let isEmail = await this.VerifyObject(employee);
            if(isEmail){
                const newEmp = new this.EmployeModel(employee);
                newEmp.date_create = new Date();
                const employee_Save = await newEmp.save();
                return employee_Save;
            }else{
                return null;
            }
           
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
        let result = null;
        try {
            // console.log(employee)
            let isEmail = await this.VerifyObject(employee);
            const newEmp = new this.EmployeModel(employee);
            console.log(isEmail)
            if(isEmail){
                if(db == null){
                    db_test = 1;
                    client = await getClient();
                    db = client.db(process.env.DB_NAME); 
                }    
                if(employee.working_hours){
                    this.HoursWorkingSave(employee.working_hours,db);
                }
                result  = await db.collection('employees').updateOne(
                {_id :new ObjectId(employee._id)},
                {$set:{
                    name:newEmp.name,
                    first_name : newEmp.first_name,
                    email : newEmp.email,
                    password : newEmp.password,
                    login : newEmp.login,
                    service : newEmp.service,
                    date_last_update : new Date(),
                    time_between : newEmp.working_hours.time_between,
                    end_time : newEmp.working_hours.end_time,
                    working_hours : newEmp.working_hours
                    
                }});
                
                return result;
            }else{
                throw new Error("Email Not Valid");
            }
            // let result = newEmp.save();

        } catch (error) {
            throw error;
        }finally {
            if (db_test != 0 && client!=null) {
                client.close();
            }
        }
    }

    async getEmployeeById(_id,db){
        let client = null;
        let db_test = 0;
        let result = null;
        try {
            if(db===null){
                db_test = 1;
                client = await getClient();
                db = client.db(process.env.DB_NAME);
            }
            result = db.collection('employees').findOne({_id:new ObjectId(_id)});
            return result;
        } catch (error) {
            throw error;
        }
    }

    async DeleteEmployee(_id){
        try {
            
        } catch (error) {
            
        }
    }

    async HoursWorkingSave(hoursWork,db){
        let client = null;
        let db_test = 0;
        let result = null;
        try {
            if(db===null){
                db_test = 1;
                client = await getClient();
                db = client.db(process.env.DB_NAME);
            }
            hoursWork.date_create = new Date();
            result = db.collection('work_hours').insertOne(hoursWork);
            return result;
        } catch (error) {
            throw error;
        }finally{
            if(client!==null && db_test===1){
                client.close();
            }
        }
    }

    


    
}

module.exports = new Employee();