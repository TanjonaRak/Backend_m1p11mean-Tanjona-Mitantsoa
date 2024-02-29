const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { getClient } = require('../../Utility/db');
require('dotenv').config();
const { ObjectId } = require('mongoose').Types;

class Expenses {

    expense = new Schema({
        // _id:{type:String},
        name_expense : {type:String,required:true},
        amount : {type:Number,required:true},
        date : {type:Date,required:true}
    })
    ExpensesModel = mongoose.model('expenses',this.expense);

    async VerifyExpenses(expenses){
        let amount = Number(expenses.amount).toString();
        if (amount === "NaN") {
            throw new Error("Sum is not a number");
        }
    }

    async SaveExpenses(expenses){
        try {
            await this.VerifyExpenses(expenses);
            const newExpenses = new this.ExpensesModel(expenses);
            let expenseCreate =await newExpenses.save();
            return expenseCreate;
        } catch (error) {
            throw error;
        }
    }
    async getDepenses(expenses,offset,limit){
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
            
            if(expenses && Object.keys(expenses).length > 0){
                let aggregationPipeline = []
                // Ajoutez l'étape $match pour la plage de dates
                if (expenses.start_date && expenses.end_date) {
                    const startDate = new Date(expenses.start_date);
                    const endDate = new Date(expenses.end_date);
        
                    // Ajoutez l'étape $match pour la plage de dates
                    aggregationPipeline.push({
                        "$match": {
                            "date": { "$gte": startDate, "$lte": endDate }
                        }
                    });
                }
                match.$and = date_filtre;
                // console.log(offset)
                result = await db.collection("expenses").aggregate(aggregationPipeline).sort({start_date:-1}).skip(Number(offset)).limit(Number(limit)).toArray();
                lineNumber = parseInt(((result.length/limit) + 1));
            }else{
                console.log("DB : ",db)
                lineNumber = await this.getLigneNumber(db,limit);    
                result = await db.collection("expenses").find({}).sort({start_date:-1}).skip(Number(offset)).limit(Number(limit)).toArray();
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
            let result = await db.collection('expenses').find({}).toArray();
            return parseInt(((result.length/limit) + 1));
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new Expenses();