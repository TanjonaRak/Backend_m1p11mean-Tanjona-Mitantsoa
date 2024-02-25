const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const ExpensesController = require('../../Controllers/Manager/ExpensesController');
    router.post('/',ExpensesController.SaveExpenses);
    // router.get('/:_offset/:_limit',ServiceController.getServices);
    // router.put('/',ServiceController.UpdateService);
    // router.put('/',EmployeeController.UpdateEmployee);
    return router;
};