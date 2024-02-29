
const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const ManagerController = require('../../Controllers/Manager/ManagerController');
    router.post('/login',ManagerController.LoginManager);
    router.post('/',ManagerController.SaveManager);
    // router.post('/search/:_offset/:_limit',ExpensesController.getExpenses);
    // router.put('/',ServiceController.UpdateService);
    // router.put('/',EmployeeController.UpdateEmployee);
    return router;
};