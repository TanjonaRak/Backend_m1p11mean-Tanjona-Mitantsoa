const express = require('express');


const router = express.Router();

module.exports = function (io) {
    const HistoriqueScanRoute = require('./HistoriqueScanRoute')(io);
    const EmployeeRoute  = require('./Employee/EmployeeRoute')(io);
    const CustomerRoute = require('./Customer/CustomerRoute')(io);
    
    const PreferenceRoute = require('./Customer/PreferenceRoute')(io)
    const PreferenceEmployeeRoute = require('./Preference/PreferenceEmployeeRoute')(io)
    const PreferenceServiceRoute = require('./Preference/PreferenceServiceRoute')(io)
    const ExpensesRoute = require('./Manager/ExpensesRoute')(io);
    const OfferModel = require('./Manager/OfferRoute')(io);
    const ServiceRoute = require('./Service/ServiceRoute')(io);
    const AppointmentRoute =  require('./Appointment/Appointment')(io);

    router.use('/scan',HistoriqueScanRoute);
    router.use('/employee',EmployeeRoute);
    router.use('/customer',CustomerRoute);
    router.use('/service',ServiceRoute);
    router.use('/preference',PreferenceRoute)
    router.use('/preference-employee',PreferenceEmployeeRoute)
    router.use('/preference-service',PreferenceServiceRoute)
    router.use('/expenses',ExpensesRoute)
    router.use('/offer',OfferModel)
    router.use('/appointment',AppointmentRoute);
    
    
    return router;
};
