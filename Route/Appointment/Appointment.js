const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const AppointmentController = require('../../Controllers/Appointment/AppointmentController');
    router.post('/',AppointmentController.SaveAppointment);
    router.get('/get',AppointmentController.getDataAppointment);
    router.post('/getEmp',AppointmentController.getEmpAvailable);
    router.post('/getTimeAvailable',AppointmentController.getAvailableTime);
    router.post('/getCompareTimeService',AppointmentController.compareTimeService);
    router.post('/employee-appointment',AppointmentController.getEmployeeByAppointment);
    router.post('/getAppHistory',AppointmentController.getAppointmentHistory);
    router.get('/:year/:month',AppointmentController.getTurnover);

    router.post('/employee-task',AppointmentController.getTaskByEmployee);
    router.put('/employee-task/:id_task/:state',AppointmentController.UpdateTask)
    
    return router;
};  
