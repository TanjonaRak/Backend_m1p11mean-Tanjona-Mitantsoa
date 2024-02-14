const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const CustomerController = require('../../Controllers/Customer/CustomerController');
    router.post('/',CustomerController.RegisterCustomer);
    router.get('/get',CustomerController.getDataCustomer);
    router.post('/:email/:password',CustomerController.loginProcessing);

    return router;
};  
