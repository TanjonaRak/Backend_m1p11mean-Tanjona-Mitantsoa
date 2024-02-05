const express = require('express');

const router = express.Router();




module.exports = function (io) {
    const HistoriqueScanRoute = require('./HistoriqueScanRoute')(io);
    // const apiDocs = require('./apiDocs')(io);

    router.use('/scan',HistoriqueScanRoute)
    return router;
};
