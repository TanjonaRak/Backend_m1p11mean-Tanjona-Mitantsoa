const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const PreferenceController = require('../../Controllers/Customer/PreferenceController');
    router.post('/:state',PreferenceController.CheckPreference);
    // router.post('/',PreferenceController.getPreferencesByCustomer);
    router.post('/Preference/Employee',PreferenceController.getEmployeePreferenceCustomer);
    return router;
};  