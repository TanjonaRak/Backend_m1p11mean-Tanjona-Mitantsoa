const express = require('express');

const router = express.Router();
const swaggerUI = require("swagger-ui-express");
const { verifyToken, } = require('../controllers/TokenController');



module.exports = function (io) {
    const HistoriqueScanRoute = require('./HistoriqueScanRoute')(io);
    // const apiDocs = require('./apiDocs')(io);

    router.use('/scan',HistoriqueScanRoute)
    return router;
};
