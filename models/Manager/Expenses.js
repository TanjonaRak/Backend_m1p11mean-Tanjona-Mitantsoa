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
            throw new Error("Amount is not a number");
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
    async getDepenses(){
        
    }

}

module.exports = new Expenses();