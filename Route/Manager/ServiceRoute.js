

const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const ServiceController = require('../../Controllers/Manager/ServiceController');
    router.post('/',ServiceController.SaveService);
    router.get('/:_offset/:_limit',ServiceController.getServices);
    // router.put('/',EmployeeController.UpdateEmployee);
    return router;
};