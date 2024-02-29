const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { getClient } = require('../../Utility/db');
require('dotenv').config();
const { ObjectId } = require('mongoose').Types;

class Service {
    service = new Schema({
        name: { type: String, required: true },
        delay: { type: Number, required: true },
        price: { type: Number, required: true },
        commission: { type: Number, required: true },
        description: { type: String },
        date_create: { type: Date },
        state: { type: Number },
        date_to_update: { type: Date }
    })
    ServiceModel = mongoose.model('services', this.service);

    async VerifyServices(service) {
        let price = Number(service.price).toString();
        let delay = Number(service.delay).toString();
        let commission = Number(service.commission).toString();
        console.log(price=== "NaN")
        if (price === "NaN") {
            throw new Error("Price is not a number");
        } if (delay === "NaN") {
            throw new Error("delay is not a number");
        } if (commission === "NaN") {
            throw new Error("Commission is not a number");
        }
    }

    async SaveService(service) {
        try {
            await this.VerifyServices(service);
            const newService = new this.ServiceModel(service);
            newService.date_create = new Date();
            newService.state = 10;
            const serviceCreate = await newService.save();
            return serviceCreate;
        } catch (error) {
            throw error;
        }
    }

    async getService(db, offset, limit) {
        let client = null;
        let db_test = 0;
        // console.log(offset)
        // console.log(limit)
        try {
            if (db == null) {
                db_test = 1;
                client = await getClient();
                db = client.db(process.env.DB_NAME);
            }
            let result = await db.collection('services').find({}).sort({ _id: -1 }).skip(Number(offset)).limit(Number(limit)).toArray();
            return result;
        } catch (error) {
            throw error;
        } finally {
            if (db_test != 0 && client != null) {
                client.close();
            }
        }
    }

    async getLigneNumber(db, limit) {
        try {
            let result = await db.collection('services').find({}).toArray();
            return parseInt(((result.length / limit) + 1));
        } catch (error) {
            throw error;
        }
    }

    async UpdateService(service) {
        try {
            await this.VerifyServices(service);
            // console.log(isPrice)
            const newService = new this.ServiceModel(service);
            newService.date_to_update = new Date();
            console.log(service)
            let res = await this.ServiceModel.findOneAndUpdate(
                { _id: service._id },
                newService,
                { new: true }
            );
            return res;
        } catch (error) {
            throw error;
        }
    }

    async DeleteService(_id){
        let client = null;
        try {
            client = await getClient();
            let db = client.db(process.env.DB_NAME);
            let result = await db.collection("services").updateOne({_id:new ObjectId(_id)},{$set:{state:0}});
            return result;
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Service();