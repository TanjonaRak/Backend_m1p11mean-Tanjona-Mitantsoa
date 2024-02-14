const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { getClient } = require('../../Utility/db');
require('dotenv').config();
class Service {
    service = new Schema({
        name : {type:String,required:true},
        delay : {type:Number,required:true},
        price : {type:Number,required:true},
        commission : {type:Number,required:true},
        description : {type:String},
        date_create : {type:Date},
        state : {type:Number}
    })
    ServiceModel = mongoose.model('service',this.service);

    async SaveService(service){
        try {
            const newService = new this.ServiceModel(service);
            newService.date_create = new Date();
            newService.state = 10;
            const serviceCreate =await newService.save();
            return serviceCreate;
        } catch (error) {
            throw error;
        }        
    }

    async getService (db,offset,limit){
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
            let result = await db.collection('services').find({}).sort({_id:-1}).skip(Number(offset)).limit(Number(limit)).toArray();
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
            let result = await db.collection('services').find({}).toArray();
            return parseInt(((result.length/limit) + 1));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Service();