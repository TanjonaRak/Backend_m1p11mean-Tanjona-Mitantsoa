const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const PreferenceController = require('../../Controllers/Preference/PreferenceEmployeeController');
    router.post('/:state',PreferenceController.CheckPreferenceEmployee);
    // router.post('/',PreferenceController.);
    router.post('/employee/preference',PreferenceController.getEmployeePreferenceCustomer);
    router.post('/employee/preference-favoris',PreferenceController.getEmployeePreferenceCustomerFavoris);
    return router;

    
};  