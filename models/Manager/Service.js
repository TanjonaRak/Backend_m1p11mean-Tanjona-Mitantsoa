const { Schema } = require('mongoose');
const mongoose = require('mongoose');

class Service {
    service = new Schema({
        name : {type:String,required:true},
        delay : {type:Number,required:true},
        price : {type:Number,required:true},
        commission : {type:Number,required:true},
        description : {type:String},
        date_create : {type:Date},
    })
    ServiceModel = mongoose.model('service',this.service);

    async SaveService(service){
        try {
            const newService = new this.ServiceModel(service);
            newService.date_create = new Date();
            const serviceCreate =await newService.save();
            return serviceCreate;
        } catch (error) {
            throw error;
        }        
    }
}

module.exports = new Service();