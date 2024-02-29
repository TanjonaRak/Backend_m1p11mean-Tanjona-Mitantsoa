

const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const EmployeeController = require('../../Controllers/Employee/EmployeeController');
    router.post('/',EmployeeController.SaveEmployee);
    router.get('/:_offset/:_limit',EmployeeController.getEmployee);
    router.post('/AppointmentEmp',EmployeeController.getAppointmentEmp);
    router.get('/state-app/:year/:month',EmployeeController.getNbrAppointmentPerDayPerMonth);

    router.put('/',EmployeeController.UpdateEmployee);
    router.get('/:_id',EmployeeController.getEmployeeById);
    return router;
};