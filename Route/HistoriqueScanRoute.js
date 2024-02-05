


const express = require('express');

const router = express.Router();

const HistoriqueScanController = require('../../../controllers/PARK/HistoriqueScanController');

// router.post('/',HistoriqueScanController.AddHistorique);

module.exports = (io) => {
    const HistoriqueScanController = require('../Controllers/HistoriqueScanController');
    router.post('/:_id/:_etat',HistoriqueScanController.AddHistorique);
    router.get('/',HistoriqueScanController.getHisto)
    return router;
};