const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const AppointmentController = require('../../Controllers/Appointment/AppointmentController');
    router.post('/',AppointmentController.SaveAppointment);
    router.get('/get',AppointmentController.getDataAppointment);

    return router;
};  
