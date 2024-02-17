const express = require('express');


const router = express.Router();

module.exports = function (io) {
    const HistoriqueScanRoute = require('./HistoriqueScanRoute')(io);
    const EmployeeRoute  = require('./Employee/EmployeeRoute')(io);
    const CustomerRoute = require('./Customer/CustomerRoute')(io);
    const ServiceRoute = require('./Manager/ServiceRoute')(io);
    const PreferenceRoute = require('./Customer/PreferenceRoute')(io)
    const PreferenceEmployeeRoute = require('./Preference/PreferenceEmployeeRoute')(io)
    router.use('/scan',HistoriqueScanRoute);
    router.use('/employee',EmployeeRoute);
    router.use('/customer',CustomerRoute);
    router.use('/service',ServiceRoute);
    router.use('/preference',PreferenceRoute)
    router.use('/preference-employee',PreferenceEmployeeRoute)
    return router;
};
