const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');


class Service {
    service = new Schema({
     //   _id : {type:String,required : true},
        name : {type:String, required : true},
        deadline : {type:String, required : true},
        price : {type:String, required : true},
        commission : {type: Number, required : true},
        photo : {type : String, required : true},
        description : {type: String, required : true},
        state : {type:Number, required : true},
        creation_date : {type:Number, required : true}
    })

    ServiceModel = mongoose.model('service',this.service);

    constructor (){
    }

    async SaveService (service){
        try {
            console.log(service)
            const newService = new this.ServiceModel(service);
            const service_Save = await newService.save();
            return service_Save;
        } catch (error) {
            throw error;
        }
    }

    async getService (){
        let client = null;
        let db = null;
        try {
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            let customerArray = await db.collection('services').find({}).toArray();
            return customerArray;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new Service();