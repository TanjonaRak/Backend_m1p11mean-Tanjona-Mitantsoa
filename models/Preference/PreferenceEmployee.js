
const { default: mongoose } = require("mongoose");
const { Schema } = require("mongoose");
const { ObjectId } = require('mongoose').Types;
const { getClient } = require('../../Utility/db');
const  EmployeModel = require('../Employe/Employee');
const { customer } = require("../Customer/Customer");

class  PreferenceEmployee {

    preferenceEmployee = new Schema({
        customer:{type:Object,required:true},
        employee:{type:Object},
        date_create: {type:Date},
        state : {type:Number}
    })

    PreferenceEmployeeModel = mongoose.model('preferencesemployees',this.preferenceEmployee);

    async CreatePreferences(preference,db){
        try {
            let newPreference = new this.PreferenceEmployeeModel(preference);
            newPreference.state = 10;
            newPreference.date_create = new Date();
            if(db===null){
                let prefenceCreate = await newPreference.save();
                return prefenceCreate; 
            }else{
                let result = await db.collection('preferencesemployees').insertOne(newPreference);
                return result;
            }
        } catch (error) {
            throw error;
        }
    }

    async getPreferenceByCustomer(db,Customer){
        let client = null;
        let db_test = 0;
        // console.log(" ====>>> : "+Customer._id)
        try {
            if(db===null){
                client = await getClient();    
                db = client.db(process.env.DB_NAME);
                db_test = 1;
            }
            let result = await db.collection('preferencesemployees').find({"customer._id":Customer._id}).toArray();
            return result;
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

    async UpdatePreferenceCustomer(state,preference){
        let client = null;
        let db_test = 0;
        let result = null;
        try {
            // if(db===null){
            //     client = await getClient();
            //     db = client.db(process.env.DB_NAME);
            //     db_test = 1;
            // }
            client = await getClient();
            let db = client.db(process.env.DB_NAME);
            db_test = 1;
            // console.log(preference._id)
            // result = await db.collection('preferencesemployees').updateOne({_id :new ObjectId(preference._id)},{
            //     $set:{
            //         state : Number(state)
            //     }
            // })
            result = await db.collection('preferencesemployees').deleteOne({_id :new ObjectId(preference._id)})
            return result;
        } catch (error) {
            // console.log(error)
            throw error;
        }finally{
            if(db_test === 1 && client!==null){
                client.close();
            }
        }
    }

    async CheckPreference(preference,state){
        let client = null;
        let result = null;
        try {
            client = await getClient();
            let db = client.db(process.env.DB_NAME);
            // let newpreference =await this.getPreferenceByCustomer(preference.customer._id);
            // if(newpreference!==null){
            // console.log("jndskdsf",state)
            if(Number(state) === 10){
                // console.log("jndskdsf")
                result =await this.CreatePreferences(preference,db);
            }if(Number(state) === 0 ){
                // console.log("Update")
                result = await this.UpdatePreferenceCustomer(state,preference);
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
            // console.log("  TEXT : ===>> "+customer._id)
            if(db === null){
                client = await getClient();
                db = client.db(process.env.DB_NAME);
                db_test = 1 ;
            }
            let preferences = await this.getPreferenceByCustomer(db,customer);
            let employees = await EmployeModel.getEmployee(db,0,100);
          
            // employees.forEach((employee) => {

            // });
            // console.log(employees.length)
            for(let i=0;i<employees.length;i++){
                employees[i].state = 0;
                // console.log(" ===>>>>> "+ preferences.length)
                for(let n = 0 ; n<preferences.length;n++){
                    // console.log(preferences[n])
                    // console.log(employees[i]._id)
                    // console.log(preferences[n]?.employee._id == employees[i]._id)
                    if(preferences[n]?.employee._id== employees[i]._id && preferences[n]?.state ===10){
                        employees[i].state = 10;
                        employees[i]._idpreference = preferences[n]._id
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
    async getPreferencesEmployeeFavoris(customer,db){
        let client = null;
        // let db = null;
        let db_test = 0;
        let employeeResult= [];
        try {   
            // console.log("  TEXT : ===>> "+customer._id)
            if(db === null){
                client = await getClient();
                db = client.db(process.env.DB_NAME);
                db_test = 1 ;
            }
            let preferences = await this.getPreferenceByCustomer(db,customer);
            let employees = await EmployeModel.getEmployee(db,0,100);
          
            // employees.forEach((employee) => {

            // });
            // console.log(employees.length)
            for(let i=0;i<employees.length;i++){
                employees[i].state = 0;
                // console.log(" ===>>>>> "+ preferences.length)
                for(let n = 0 ; n<preferences.length;n++){
                    // console.log(preferences[n])
                    // console.log(employees[i]._id)
                    // console.log(preferences[n]?.employee._id == employees[i]._id)
                    if(preferences[n]?.employee._id== employees[i]._id && preferences[n]?.state ===10){
                        employees[i].state = 10;
                        employees[i]._idpreference = preferences[n]._id
                        employeeResult.push(employees[i]);
                        continue ;
                    }
                }
               
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

module.exports = new PreferenceEmployee();