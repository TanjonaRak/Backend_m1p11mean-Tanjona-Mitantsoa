


const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const HistoriqueScanController = require('../Controllers/HistoriqueScanController');
    router.post('/:_id/:_etat',HistoriqueScanController.AddHistorique);
    router.get('/',HistoriqueScanController.getHisto)
    router.get('/get',HistoriqueScanController.get)
    return router;
};