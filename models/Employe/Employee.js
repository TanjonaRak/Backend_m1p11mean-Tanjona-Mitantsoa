const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
require('dotenv').config();

class Employee {

    employee = new Schema({
       // _id: { type: String, required: true },
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

    async getEmpPerService (service){
        let client = null;
       let db = null;
        try {
            console.log(service)
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            console.log({"service": {$elemMatch : {"name" : service.name }}})
            let empService = await db.collection('employees').find({"service": {$elemMatch : {"name" : service.name }}}).toArray();
            return empService;
        } catch (error) {
            throw error;
        }
    }

    async AppointmentEmp (employee){
        try {
            let client = null;
            let db = null;
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            let getAppointment = await db.collection('appointments').find(
                { "employee._id": employee._id },
               { "service.name": 1, "dateAppointment": 1, "hours": 1, "_id": 0 } 
              ).toArray();
        
              return getAppointment;
        } catch (error) {
            throw error;
        }
    }
    //Le numéro du mois (0 pour janvier, 1 pour février, 
    async getDaysInMonth(month, year) {
        const date = new Date(year, month+1, 0).getDate();
        const days = [];
        // console.log(date.getMonth()==month)
        for (let i = 0;i<=date;i++) {
            console.log("mita")
            days.push(new Date(year,month-1,i));
            // date.setDate(date.getDate() + 1);
        }
    
        return days;
    }
    
    async NbrAppointmentPerDayPerMonth (yearState,monthState){
        try {
            let client = null;
            let db = null;
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            let days =  await this.getDaysInMonth(monthState,yearState);

            let pipline = [
                {
                    "$project": {
                        year: { $year: "$dateAppointment" },
                        month: { $month: "$dateAppointment" },
                        dateAppointment:"$dateAppointment"
                    },
                },
                {
                    "$match": {
                        year: Number(yearState),    
                        month: Number(monthState)
                    },
                },
                {
                    $group: {
                        _id: { date:"$dateAppointment"},
                        nbTask: { $sum: 1 },
                    }
                },
            ];
            let result = await db.collection('appointments').aggregate(pipline).toArray();
            console.log("result==>>",result);
            console.log("day==>>",days);
            let dataSend = [];

            for(let i=0;i<days.length;i++){
                let test = false;
                for(let j=0;j<result.length;j++){
                    console.log(result[j]._id.date.toLocaleString().split(" ")[0],"===",days[i].toLocaleString().split(" ")[0])
                    if(result[j]._id.date.toLocaleString().split(" ")[0]===days[i].toLocaleString().split(" ")[0]){
                        let res = {
                            "x" : new Date(days[i]),
                            "y" : result[j].nbTask
                        }
                        test = true;
                        dataSend.push(res);
                        continue;
                    }
                }
                if(test===false){
                    let res = {
                        "x" :new Date(days[i]),
                        "y" : 0
                    }
                   
                    dataSend.push(res);
                }
            }
            return dataSend;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = new Employee();