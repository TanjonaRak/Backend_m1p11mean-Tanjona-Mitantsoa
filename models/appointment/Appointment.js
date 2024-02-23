const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
const Customer = require('../Customer/Customer');
const Service = require('../Service/Service');
const  Employee  = require('../Employe/Employee');


class Appointment {

     appointment = new Schema({
       // _id: { type: String, required: true },
        customer: { type: Object, required: true },
        service: { type: Object, required: true },
        employee: { type: Object,  required: true },
        dateAppointment: { type: Date, required: true },
        hours: { type: String, required: true },
        state: { type: Number, required: true },
        date_create: { type: Date, required: true }
    });
    
    constructor (){  
          this.appointment.name = "name";
      }
    AppointmentModel = mongoose.model('appointment',this.appointment);

    async SaveAppointment (appointment){
        try {
          
            const newAppointment = new this.AppointmentModel(appointment);
            const save_appointment = await newAppointment.save();
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
    
    async getEmpAvailable (appointment){
        let client = null;
        let db = null;
        try {
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            let empService = await Employee.getEmpPerService(appointment.service);
            console.log(JSON.stringify(empService))
              console.log({"$match":{
                         "employee":{"$in" : empService},
                         "dateAppointment": new Date(appointment.dateAppointment)}});
                        
              let empAvalaible = await db.collection('appointments').aggregate([
            //     {
            //     "$match":{
            //          "employee":{"$in" : empService},
            //         //  "dateAppointment": new Date(appointment.dateAppointment)
            //      }
            //    },
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
                let delay = this.getInt(getEmpHour[i].hours)+getEmpHour[i].service.deadline;
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
                let delay = this.getInt(getEmpHour[i].hours)+getEmpHour[i].service.deadline;
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
        return dispo;
    }

    getInt (time){
        console.log(time)
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
            const timeService = appointment.service.deadline;
            let data = [];

            for(let i=1;i<availableTime.length;i++){
                if(timeService < availableTime[i].hoursEnd){
                    const result = {
                        hourAppointment : this.minutesToTimeString(availableTime[i].hoursStart)
                        
                    }
                    data.push(result);
                }
            }
            return data;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = new Appointment();

