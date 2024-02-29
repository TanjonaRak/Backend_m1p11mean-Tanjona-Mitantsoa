const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const ExpensesController = require('../../Controllers/Manager/ExpensesController');
    router.post('/',ExpensesController.SaveExpenses);
    router.post('/search/:_offset/:_limit',ExpensesController.getExpenses);
    // router.put('/',ServiceController.UpdateService);
    // router.put('/',EmployeeController.UpdateEmployee);
    return router;
};