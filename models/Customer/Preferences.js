const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");
const { ObjectId } = require('mongoose').Types;
const { getClient } = require('../../Utility/db');
const  EmployeModel = require('../Employe/Employee')
// const ServiceModel = require('');

require('dotenv').config();

class Preference {
    preference = new Schema({
        customer:{type:Object,required:true},
        services : {type:Object},
        employee:{type:Object},
        service_employee:{type:Object},
        date_create: {type:Date},
        state : {type:Number}

    })
    PreferenceModel = mongoose.model('preference',this.preference);

    async CreatePreferences(preference,db){
        // let client = null;
        try {
            let newPreference = new this.PreferenceModel(preference);
            if(db===null){
                newPreference.date_create = new Date();
                newPreference.state = 10;
                let prefenceCreate = await newPreference.save();
                return prefenceCreate; 
            }else{
                let result = await db.collection('preferences').insertOne(newPreference);
                return result;
            }
           
        } catch (error) {
            throw error;
        }
    }

    async getPreferenceByCustomer(db,Customer){
        let client = null;
        let db_test = 0;
        try {
            if(db===null){
                client = await getClient();    
                db = client.db(process.env.DB_NAME);
                db_test = 1;
            }
            // let newPreference = new this.PreferenceModel();
            let result = await db.collection('preferences').find({"customer._id":new ObjectId(Customer._id)}).toArray();
            if(result.length !==0){
                return result;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }finally{
            if(db_test ==1 && client!==null){
                client.close();
            }
        }
    }

    async  SavePreferenceCustomer(preference){
        let client = null;
        let db = null
        let result = null;
        try {
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            // let newpreference =await this.getPreferenceByCustomer(preference.customer._id);
            // if(newpreference!==null){
            result =await this.CreatePreferences(preference,db);
            return result;
            // }else{
                
            // }
        } catch (error) {
            throw error;
        }finally{
            if(client!==null){
                client.close();
            }
        }
    }

    async UpdatePreferenceCustomer(state,id,db){
        let client = null;
        let db_test = 0;
        let result = null;
        try {
            if(db===null){
                client = await getClient();
                db = client.db(process.env.DB_NAME);
                db_test = 1;
            }
            result = await db.collection('preferences').updateOne({_id : new ObjectId(id)},{
                $set:{
                    state : state
                }
            })
            return result;
        } catch (error) {
            throw error;
        }finally{
            if(db_test === 1 && client!==null){
                client.close();
            }
        }
    }

    async CheckPreference(preference,state){
        let client = null;
        let db = null
        let result = null;
        try {
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            // let newpreference =await this.getPreferenceByCustomer(preference.customer._id);
            // if(newpreference!==null){
                if(state === 10){
                    result =await this.CreatePreferences(preference,db);
                }if(state === 0 ){
                    result = await this.UpdatePreferenceCustomer(preference,db);
                }
            return result;
        } catch (error) {
            throw error;
        }finally{
            if(client!==null){
                client.close();
            }
        }
    }

    async getPreferencesEmployee(customer,db){
        let client = null;
        // let db = null;
        let db_test = 0;
        let employeeResult= [];
        try {   
            
            if(db === null){
                client = await getClient();
                db = client.db(process.env.DB_NAME);
                db_test = 1 ;
            }
            let employees = await EmployeModel.getEmployee(db,0,100);
            let preferences = await this.getPreferenceByCustomer(db,customer);
            // employees.forEach((employee) => {

            // });
            // console.log(employees.length)
            for(let i=0;i<employees.length;i++){
                employees[i].state = 0;
                for(let n = 0 ; n<preferences?.length;n++){
                    if(preferences[n].employee!==null && preferences[n].employee._id === employees[i]._id){
                        employees[i].state = 10;
                        continue ;
                    }
                }
               
                employeeResult.push(employees[i]);
            }
            return employeeResult
        } catch (error) {
            throw error;
        }finally{
            if(db_test === 1 && client !==null){
                client.close();
            }
        }
    }

    
    

}

module.exports = new Preference;