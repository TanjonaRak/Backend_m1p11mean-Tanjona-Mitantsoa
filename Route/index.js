const express = require('express');


const router = express.Router();

module.exports = function (io) {
    const HistoriqueScanRoute = require('./HistoriqueScanRoute')(io);
    const EmployeeRoute  = require('./Employee/EmployeeRoute')(io);
    const CustomerRoute = require('./Customer/CustomerRoute')(io);



    router.use('/scan',HistoriqueScanRoute);
    router.use('/employee',EmployeeRoute);
    router.use('/customer',CustomerRoute);


    return router;
};
