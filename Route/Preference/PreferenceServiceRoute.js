

const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const PreferenceService = require('../../Controllers/Preference/PreferenceServiceController');
    router.post('/:state',PreferenceService.CheckPreferenceService);
    // router.post('/',PreferenceController.);
    router.post('/service/preference',PreferenceService.getServicePreferenceCustomer);
    return router;

    
};  