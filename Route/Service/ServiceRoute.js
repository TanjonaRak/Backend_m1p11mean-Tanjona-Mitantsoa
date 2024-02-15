const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const ServiceController = require('../../Controllers/Service/ServiceController');
    router.post('/',ServiceController.RegisterService);
    router.get('/get',ServiceController.getDataService);
   
    return router;
}; 