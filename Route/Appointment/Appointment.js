const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const AppointmentController = require('../../Controllers/Appointment/AppointmentController');
    router.post('/',AppointmentController.SaveAppointment);
    router.get('/get',AppointmentController.getDataAppointment);
    router.post('/getEmp',AppointmentController.getEmpAvailable);
    router.post('/getTimeAvailable',AppointmentController.getAvailableTime);
    router.post('/getCompareTimeService',AppointmentController.compareTimeService);
    
    return router;
};  
