

const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
const employeeModel = require('../Employe/Employee');

class StatistiqueManager {


    async getHoursPerEmployee(db, yearState, monthState) {
        try {
            let pipline = [
                {

                    "$project": {
                        year: { $year: "$dateAppointment" },
                        month: { $month: "$dateAppointment" },
                        // day:{$days:"$dateAppointment"},
                        id_employee: "$employee._id",
                        name_employee: "$employee.name",
                        delay_service: "$service.delay"
                    },
                },
                {
                    "$match": {
                        year: Number(yearState),
                        month: Number(monthState)
                    },
                },
                {
                    $group: {
                        _id: {id_employee: "$id_employee", name_employee: "$name_employee",date_appointment : "$dateAppointment" },
                        nbTask: { $sum: 1 },
                        sumHours: { $sum: "$delay_service" }
                    }
                },
                {
                    $addFields: {
                        HoursMoyen: { $divide: ['$sumHours', '$nbTask'] },
                    },
                }
            ];
            let result = await db.collection('appointments').aggregate(pipline).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async formatDataFront(db, year, month) {
        try {
            let employees = await employeeModel.getEmployee(db, 0, 100);
            let stateHours = await this.getHoursPerEmployee(db, year, month);
            let dataSend = [];
            for (let i = 0; i < employees.length; i++) {
                let testEnter = false;
                for (let n = 0; n < stateHours.length; n++) {
                    console.log(employees[i]._id)
                    if (employees[i]._id.equals(stateHours[n]._id.id_employee)) {
                        testEnter = true;
                        const res = {
                            label: employees[i].name,
                            y: stateHours[n].HoursMoyen / 60
                        }
                        dataSend.push(res);
                        continue;
                    }
                }
                if (testEnter === false) {
                    const res = {
                        label: employees[i].name,
                        y: 0
                    }
                    dataSend.push(res);
                }
            }
            return dataSend;
        } catch (error) {
            throw error;
        }
    }

    async getStateManager(year, month) {
        let client = null;
        try {
            client = await getClient();
            let db = client.db(process.env.DB_NAME);
            let result = await this.formatDataFront(db, year, month);
            let benefice  = await this.getBenefice(db,year);
            return {result,benefice};
        } catch (error) {
            throw error;
        } finally {
            if (client !== null) client.close();
        }
    }

    // async getExpenseSalary(db) {
    //     try {
    //         let pipeline = [

    //         ]
    //         let result = await db.collection('employees').find({});
    //     } catch (error) {

    //     }
    // }

    async getExpensesOther(db, yearState) {
        try {
            let pipeline = [
                {
                    "$project": {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        amount: "$amount"
                    },
                },
                {
                    "$match": {
                        year: Number(yearState)
                        // month: Number(monthState)
                    },
                },

                {
                    $group: {
                        _id: { year: "$year", month: "$month" },
                        // nbTask: { $sum: 1 },
                        sumExpenses: { $sum: "$amount" }
                    }
                },
                {
                    "$sort": { "month": 1 }
                },
            ]
            let result = await db.collection('expenses').aggregate(pipeline).toArray();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async FormatFrontExpensesOther(db, yearState) {
        try {
            let result = await this.getExpensesOther(db, yearState);
            let month = [
                { "name": "January", value: 1 },
                { "name": "february", value: 2 },
                { "name": "Mars", value: 3 },
                { "name": "April", value: 4 },
                { "name": "May", value: 5 },
                { "name": "June", value: 6 },
                { "name": "July", value: 7 },
                { "name": "Aout", value: 8 },
                { "name": "September", value: 9 },
                { "name": "October", value: 10 },
                { "name": "November", value: 11 },
                { "name": "December", value: 12 },
            ]
            let data = [];
            for (let n = 0; n < month.length; n++) {
                let testEnter = false;
                for (let i = 0; i < result.length; i++) {
                    if (month[n].value === result[i]._id.month) {
                        testEnter = true;
                        let res = {
                            name: month[n].name,
                            value: month[n].value,
                            amount: result[i].sumExpenses
                        }
                        data.push(res);
                        continue;
                    }
                }
                if (testEnter === false) {
                    let res = {
                        name: month[n].name,
                        value: month[n].value,
                        amount: 0
                    }
                    data.push(res);
                }
            }
            return data;
            // for
        } catch (error) {
            throw error;
        }
    }

    async getSTATE2(year) {
        let client = null;
        try {
            client = await getClient();
            let db = client.db(process.env.DB_NAME);
            let result = await this.getBenefice(db, year);
            return result;
        } catch (error) {
            throw error;
        } finally {
            if (client !== null) client.close();
        }
    }

    async getRevenue(db, yearState) {
        try {
            let pipeline = [
                {
                    "$project": {
                        year: { $year: "$dateAppointment" },
                        month: { $month: "$dateAppointment" },
                        price: "$service.price"
                    },
                },
                {
                    "$match": {
                        year: Number(yearState),
                        // month: Number(monthState)
                    },
                },
                {
                    $group: {
                        _id: { year: "$year", month: "$month" },
                        // nbTask: { $sum: 1 },
                        sum: { $sum: "$price" }
                    }
                },
                {
                    "$sort": { "month": 1 }
                },
            ];
            let result = await db.collection('appointments').aggregate(pipeline).toArray();
            let month = [
                { "name": "January", value: 1 },
                { "name": "february", value: 2 },
                { "name": "Mars", value: 3 },
                { "name": "April", value: 4 },
                { "name": "May", value: 5 },
                { "name": "June", value: 6 },
                { "name": "July", value: 7 },
                { "name": "Aout", value: 8 },
                { "name": "September", value: 9 },
                { "name": "October", value: 10 },
                { "name": "November", value: 11 },
                { "name": "December", value: 12 },
            ]
            let data = [];
            for (let n = 0; n < month.length; n++) {
                let testEnter = false;
                for (let i = 0; i < result.length; i++) {
                    if (month[n].value === result[i]._id.month) {
                        testEnter = true;
                        let res = {
                            name: month[n].name,
                            value: month[n].value,
                            amount: result[i].sum
                        }
                        data.push(res);
                        continue;
                    }
                }
                if (testEnter === false) {
                    let res = {
                        name: month[n].name,
                        value: month[n].value,
                        amount: 0
                    }
                    data.push(res);
                }
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getExpensesSalary(db,yearState){
        try {
            let pipeline = [
                {
                    "$project": {
                        year: { $year: "$date_create" },
                        month: { $month: "$date_create" },
                        salary: "$salary"
                    },
                },
                {
                    "$match": {
                        year: {"$lte":Number(yearState)},
                        // month: Number(monthState)
                    },
                },
                {
                    "$sort": { "month": 1 }
                },
            ];
            let result = await db.collection('employees').aggregate(pipeline).toArray();
            let month = [
                { "name": "January", value: 1 },
                { "name": "february", value: 2 },
                { "name": "Mars", value: 3 },
                { "name": "April", value: 4 },
                { "name": "May", value: 5 },
                { "name": "June", value: 6 },
                { "name": "July", value: 7 },
                { "name": "Aout", value: 8 },
                { "name": "September", value: 9 },
                { "name": "October", value: 10 },
                { "name": "November", value: 11 },
                { "name": "December", value: 12 },
            ]
            let dataSend = [];
            let yearActus = new Date().getFullYear();
            let monthActus = new Date().getMonth()+1;
            for(let i = 0;i<month.length;i++){
                let sum = 0;
                for(let n = 0;n<result.length;n++){
                    // console.log(result[n].salary," RESULT ")
                    if(result[n].month<=month[i].value && result[n].salary && result[n].year<=yearActus && month[i].value<=monthActus){
                        sum+=result[n].salary;
                        // console.log(sum," <<<< === ")
                    }
                }
                let data = {
                    name : month[i].name,
                    value : month[i].value,
                    amount : sum
                }
                dataSend.push(data);
            }
            return dataSend;
        } catch (error) {
            throw error;
        }
    }

    async getBenefice(db, yearState) {
        try {
            let otherExpenses= await this.FormatFrontExpensesOther(db,yearState);
            let revenue = await this.getRevenue(db,yearState);
            let expenseSalary = await this.getExpensesSalary(db,yearState);
            let dataSend = [];
            for(let i=0;i<12;i++){
                // let sum = (revenue[i].amount - (otherExpenses[i].amount+expenseSalary[i].amount))
                let res = {
                    label : revenue[i].name,
                    y : (revenue[i].amount - (otherExpenses[i].amount+expenseSalary[i].amount))
                }
                dataSend.push(res);
            }
            return dataSend;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new StatistiqueManager();