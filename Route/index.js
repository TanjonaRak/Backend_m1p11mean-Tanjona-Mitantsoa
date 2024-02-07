const express = require('express');

const router = express.Router();




module.exports = function (io) {
    const HistoriqueScanRoute = require('./HistoriqueScanRoute')(io);
    const EmployeeRoute  = require('./Employee/EmployeeRoute')(io);

    router.use('/scan',HistoriqueScanRoute);
    router.use('/employee',EmployeeRoute);
    return router;
};
