

const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const EmployeeController = require('../../Controllers/Employee/EmployeeController');
    router.post('/',EmployeeController.SaveEmployee);
    return router;
};