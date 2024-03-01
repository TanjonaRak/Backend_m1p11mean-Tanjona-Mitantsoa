
const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { getClient } = require('../../Utility/db');
require('dotenv').config();
const { ObjectId } = require('mongoose').Types;

class Offer {
    offer = new Schema({
        service: { type: Object, required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        reduction: { type: Number, required: true },
        description: { type: String }
    })

    OfferModel = mongoose.model('offerspecialys', this.offer);


    async VerifyOffer(offer) {
        let reduction = Number(offer.reduction).toString();
        if (reduction === "NaN") {
            throw new Error("Reduction is not number");
        }           
    }

    async SaveOffer(offer) {
        try {
            await this.VerifyOffer(offer);
            const newOffer = new this.OfferModel(offer);
            const offerCreate = await newOffer.save();
            return offerCreate;
        } catch (error) {
            throw error;
        }
    }

    async getOffer(offer,offset,limit) {
        let client = null;
        // let db = null;
        try {
            client = await getClient();
            let db = client.db(process.env.DB_NAME);
            let match = {};
            let date_filtre = []
            let lineNumber = 0;
            let result = null;
            // console.log(offer.ObjectKey)
            
            if(offer && Object.keys(offer).length > 0){
                let aggregationPipeline = []
                if (offer.service) {
                    aggregationPipeline.push({
                        "$match": {
                            "service._id": offer.service._id
                        }
                    });
                }
            
                // Ajoutez l'étape $match pour la plage de dates
                if (offer.start_date && offer.end_date) {
                    const startDate = new Date(offer.start_date);
                    const endDate = new Date(offer.end_date);
        
                    // Ajoutez l'étape $match pour la plage de dates
                    aggregationPipeline.push({
                        "$match": {
                            "start_date": { "$gte": startDate, "$lte": endDate }
                        }
                    });
                }
                match.$and = date_filtre;
                // console.log(offset)
                result = await db.collection("offerspecialys").aggregate(aggregationPipeline).sort({start_date:-1}).skip(Number(offset)).limit(Number(limit)).toArray();
                lineNumber = parseInt(((result.length/limit) + 1));
            }else{
                // console.log("DB : ",db)
                lineNumber = await this.getLigneNumber(db,limit);    
                result = await db.collection("offerspecialys").find({}).sort({start_date:-1}).skip(Number(offset)).limit(Number(limit)).toArray();
                // console.log(result)
                
            }
            
            // console.log("YUHUHJ",{result,lineNumber})
            return {result,lineNumber}
        } catch (error) {
            throw error;
        }finally{
            if(client!==null){
                client.close();
            }
        }
    }

    async getLigneNumber(db,limit){
        try {
            let result = await db.collection('offerspecialys').find({}).toArray();
            return parseInt(((result.length/limit) + 1));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Offer();