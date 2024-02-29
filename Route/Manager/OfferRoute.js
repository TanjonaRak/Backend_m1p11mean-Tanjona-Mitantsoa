

const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const OfferController = require('../../Controllers/Manager/OfferController');
    router.post('/',OfferController.SaveOffer);
    router.post('/:_offset/:_limit',OfferController.getOffer);
    // router.put('/',ServiceController.UpdateService);
    // router.put('/',EmployeeController.UpdateEmployee);
    return router;
};