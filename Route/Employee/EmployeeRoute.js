

const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const EmployeeController = require('../../Controllers/Employee/EmployeeController');
    router.post('/',EmployeeController.SaveEmployee);
    router.get('/:_offset/:_limit',EmployeeController.getEmployee);
    router.post('/AppointmentEmp',EmployeeController.getAppointmentEmp);
    

    return router;
};