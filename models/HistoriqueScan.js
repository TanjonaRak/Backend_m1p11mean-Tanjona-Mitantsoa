const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const {getClient }  = require('../Utility/db');
const { db } = require('./userModels');
require('dotenv').config();

// const { getClient } = require('../../../services/db');


class HistoriqueSCan {
    historiqueScan = new Schema({
       _idOperateur :{ type : String},
       nomOperateur : {type : String},
       date_Scan : {type:String},
       _idReservation : {type : String},
       etat_Scan : {type:Number},
       Operateur : Object
    })

    HistoriqueScanModel = mongoose.model('HistoriqueScan',this.historiqueScan)

    constructor(){
    }

    async SaveHistoriqueScan (histo,db){
        try {

            const newHisto = new this.HistoriqueScanModel(histo);
            // const histoSave = await db.collection("historiquescans").insertOne(newHisto);
            // newHisto.save();
            const histoSave = await newHisto.save();
            return histoSave
        } catch (error) {
            throw error;            
        }
    }

    async get (){
        let client = null;
        let db = null;
        try {
            client = await getClient();
            db = client.db("Hotel");
            let newHisto = await db.collection('historiquescans').find({}).toArray();
            return newHisto;
        } catch (error) {
            throw error;            
        }finally {
            if (client != null) {
                client.close();
            }
        }
    }

    async getByReservation(idres){
        try {
            const newHisto = await this.HistoriqueScanModel.find({_idReservation:idres});
            return newHisto.toArray();
        } catch (error) {
            throw error;
        }
    }

    async ScanSucccess (histo,id,etat){
        let client = null;
        let result = null;
        let db = null;
        try {
            // client = await getClient(); CONNECTION TONY
            // db = client.db(env.DB_DbName);CONNECTIONTONY 
            // await this.SaveHistoriqueScan(histo);
            // let res = new Reservation();
            // console.log("MMM1")
            // let TestValidity = await res.getReservationByDate(db,id);
            // console.log("MMM2"+TestValidity)
            if(TestValidity === true){
                // result = await res.UpdateEtat(id,etat,db);
                return result;
            }else{
                // throw new Error(TestValidity)
            }
        } catch (error) {
            throw error;
        }finally {
            // if (client != null) {
            //     client.close();
            // }
        }
    }


}

module.exports = new HistoriqueSCan();