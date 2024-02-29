const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
const Customer = require('../Customer/Customer');
const Service = require('../Service/Service');
const  Employee  = require('../Employe/Employee');
const nodemailer = require("nodemailer");
const e = require('express');


class Appointment {

     appointment = new Schema({
       // _id: { type: String, required: true },
        customer: { type: Object, required: true },
        service: { type: Object, required: true },
        employee: { type: Object,  required: true },
        dateAppointment: { type: Date, required: true },
        hours: { type: String, required: true },
        // state: { type: Number, required: true },

        // customer: { type: Object, required: true },
        // service: { type: Object, required: true },
        // employee: { type: Object, required: true },
        // dateAppointment: { type: Date, required: true },
        // hours: { type: String, required: true },
        state: { type: Number, required: true },//0 RDV fait na oe efa vita // 1RDV annulena

        date_create: { type: Date, required: true },
        date_finished :{type:Date}//////DATE FINISHED ===>> AN'TANJONA TYYY AHNN

    });
    
    constructor (){  
          this.appointment.name = "name";
      }
    AppointmentModel = mongoose.model('appointment',this.appointment);

    async SaveAppointment (appointment){
        try {
            
            const newAppointment = new this.AppointmentModel(appointment);
            
            newAppointment.state = 10;
            newAppointment.date_create = new Date();
            let testIsEmployee = false;
            if(!newAppointment.employee){
                // let dt = 
                // console.log(newAppointment,"NEW APPP")
                // console.log("EMP === <<<<<<< ",await this.getEmpPerHour(newAppointment)[0])
               testIsEmployee = true;
               newAppointment.employee = await this.getEmpPerHour(newAppointment);
            }if(testIsEmployee){
                newAppointment.employee = newAppointment.employee[0]
            }
            const  save_appointment= await newAppointment.save();
            return save_appointment;
        } catch (error) {
            throw error;
        }
    }

    async getAppointment (){
        let client = null;
        let db = null;
        try {
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            let appointmentArray = await db.collection('appointments').find({}).toArray();
            return appointmentArray;
        } catch (error) {
            throw error;
        }
    }
    //getRDV
    async getEmpAvailable (appointment){
        let client = null;
        let db = null;
        try {
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            let empService = await Employee.getEmpPerService(appointment.service);
            console.log(JSON.stringify(empService))
            console.log(appointment.dateAppointment)
              console.log({"$match":{
                         "employee":{"$in" : JSON.stringify(empService)},
                         "dateAppointment": appointment.dateAppointment}});
                        
              let empAvalaible = await db.collection('appointments').aggregate([
                {
                "$match":{
                    //  "employee":{"$in" : empService},
                    //  "dateAppointment": new Date(appointment.dateAppointment)
                 }
               },
                {
                  $addFields: {
                    hoursAsMinutes: {
                      $add: [
                        { $multiply: [{ $toInt: { $arrayElemAt: [{ $split: ["$hours", ":"] }, 0] } }, 60] }, // Convertir les heures en minutes
                        { $toInt: { $arrayElemAt: [{ $split: ["$hours", ":"] }, 1] } } // Ajouter les minutes
                      ]
                    }
                  }
                },
                { $sort: { hoursAsMinutes: 1 } },
                // { $unset: "hoursAsMinutes" } // Supprimer le champ temporaire ajouté
              ]).toArray();
            console.log("=====>>>" , empAvalaible);
            return empAvalaible;
        } catch (error) {
            throw error;
        }
        finally {
            if(client!=null){
                client.close();
            }
        }
       
    }
    
    async getEmpAvailableHour (){

    }
//  Date 
    async getAvailableTime (appointment){

        let getEmpHour =await this.getEmpAvailable(appointment);
        let dispo= [];
        dispo.push({
            hoursStart : 480,
            hoursEnd : 1020
        })
        console.log(getEmpHour.length)
        for(let i = 0;i < getEmpHour.length;i++){
            // if(i===0 && getEmpHour.dateAppointment){

            // }
            if(i<getEmpHour.length-1){
                let delay = this.getInt(getEmpHour[i].hours)+getEmpHour[i].service.delay;
                let diffHour = this.getInt(getEmpHour[i+1].hours)-delay;
                console.log(delay,"DELAY ", this.minutesToTimeString(this.getInt(getEmpHour[i+1].hours)))
                if(diffHour>0){
                    const createDispo = {
                        hoursStart : delay,
                        hoursEnd : diffHour
                    }
                    dispo.push(createDispo)
                }
            }else{
                let delay = this.getInt(getEmpHour[i].hours)+getEmpHour[i].service.delay;
                let diffHour = 1020-delay;
                if(diffHour>0){
                    const createDispo = {
                        hoursStart : delay,
                        hoursEnd : diffHour
                    }
                    dispo.push(createDispo)
                }
            }
           
        }
        console.log(dispo,"===DISPO")
        return dispo;
    }

    getInt (time){
        console.log("TIME   :::: ",time)
        let hours = Number(time.split(":")[0])*60;
        let min = Number(time.split(":")[1])
        return hours+min;
    }

    minutesToTimeString(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const hoursString = String(hours).padStart(2, '0');
        const minutesString = String(remainingMinutes).padStart(2, '0');
        return hoursString+":"+minutesString;
    }
    


    async compareTimeService (appointment){
        try {
            let availableTime = await this.getAvailableTime(appointment);
            const timeService = appointment.service.delay;
            let data = [];
            if(availableTime.length>1 && availableTime[1].hoursStart>480){
                data.push({
                    hourAppointment : this.minutesToTimeString(480),
                    hoursPlage : this.minutesToTimeString(availableTime[1].hoursStart-availableTime[1].hoursEnd)
                })
            }else{
                data.push({
                    hourAppointment : this.minutesToTimeString(480),
                    hoursPlage : this.minutesToTimeString(1020)
                })
            }
            for(let i=1;i<availableTime.length;i++){
                console.log(timeService ,"<", availableTime[i].hoursEnd)
                if(timeService <= availableTime[i].hoursEnd){
                    const result = {
                        hourAppointment : this.minutesToTimeString(availableTime[i].hoursStart),
                        hoursPlage : this.minutesToTimeString(1020)
                    }
                    data.push(result);
                }
            }
            return data;
        } catch (error) {
            throw error;
        }
    }
    
    async getEmpPerHour (appointment){
        try {
            let empService = await Employee.getEmpPerService(appointment.service);
            let empHour = await this.getEmpAvailable(appointment);
            // console.log(empService ,"SERVICE EMP ")
            // console.log(empHour,"EMP HOURS ")
            let tab = [];
            for(let i=0;i<empService.length;i++){
                let testEnter = false;
                let testIsNotAvalaible = false;
                console.log("LEN APP : ",empHour.length)
                if(empHour.length>0){
                    for(let j=0;j<empHour.length;j++){
                        // console.log(empService[i]._id.equals(empHour[j].employee._id)," === ",empHour[j].employee._id)
                        if(empService[i]._id.equals(empHour[j].employee._id)){
                            testEnter =true;
                            console.log(appointment.hours," === ",empHour[j].hours)
                            console.log("CONDITION 1 ",
                                this.getInt(empHour[j].hours)<=this.getInt(appointment.hours) &&
                                this.getInt(empHour[j].hours)+empHour[j].service.delay>this.getInt(appointment.hours)
                            )
                            console.log("CONDITION 2 ",
                                this.getInt(empHour[j].hours)<this.getInt(appointment.hours)+appointment.service.delay &&
                            this.getInt(empHour[j].hours)+empHour[j].service.delay>this.getInt(appointment.hours)+appointment.service.delay
                            )
                            if(
                            this.getInt(empHour[j].hours)<=this.getInt(appointment.hours) &&
                            this.getInt(empHour[j].hours)+empHour[j].service.delay>this.getInt(appointment.hours)
                            || 
                            this.getInt(empHour[j].hours)<this.getInt(appointment.hours)+appointment.service.delay &&
                            this.getInt(empHour[j].hours)+empHour[j].service.delay>this.getInt(appointment.hours)+appointment.service.delay
                            ){
                                testIsNotAvalaible = true;
                            }
                        }
                    }
                    console.log(testEnter," ===== ====== ",testIsNotAvalaible)
                    if(testEnter===false){
                        tab.push(empService[i]);
                    }if(testIsNotAvalaible===false){
                        tab.push(empService[i]);
                    }
                }else{
                    tab.push(empService[i])
                }
                
            }
            // console.log("TAB : ",tab)
            return tab;
        } catch (error) {
            throw error;
        }
    
    }

    async appointmentHistory(customer){
        try {
            let client = null;
            let db = null;
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            let getAppointment = await db.collection('appointments').find(
                { "customer._id": customer._id },
               { "service.name": 1, "dateAppointment": 1, "hours": 1, "_id": 0 } 
              ).toArray();
        
              return getAppointment;
        } catch (error) {
            throw error;
        }
      
    }
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
    
    async turnover (yearState,monthState){
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
                        dateAppointment:"$dateAppointment",
                        price : "$service.price"
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
                        turnover: { $sum: "$price" },
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
                            "y" : result[j].turnover
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

    

    async getTaskByStateDate(db,employee,dateTask,state){
        try {
            // console.log({" employee._id":employee._id,"dateAppointment":new Date(dateTask),state:Number(state)})
            let result = await db.collection('appointments').find({"employee._id":employee._id,"dateAppointment":new Date(dateTask),state:Number(state)}).toArray();
            return  result ;
        } catch (error){
            throw error;
        }
    }

    async getTaskByEmployee(employee,dateTask){
        let client = null;
        try {
            client = await getClient();
            let db = client.db(process.env.DB_NAME);
            let task_proccessing = await this.getTaskByStateDate(db,employee,dateTask,10);
            let task_finish =await this.getTaskByStateDate(db,employee,dateTask,20);
            return {task_finish,task_proccessing};
        } catch (error) {
            throw error;
        }finally{
            if(client!==null){
                client.close();
            }
        }
    }

    async UpdateTask (_idtask , state){
        let client  = null;
        try {
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            let result_update = await db.collection('appointments').updateOne({_id:new ObjectId(_idtask)},{$set:{state:Number(state)}})
            return result_update;
        } catch (error) {
            throw error;
        }finally{
            if(client !==null)client.close();
        }
    }




}

module.exports = new Appointment();

