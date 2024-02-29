
const express = require('express');

const router = express.Router();

module.exports = (io) => {
    const StateController = require('../../Controllers/Statistique/StatistiqueController');
    router.post('/:_year/:_month',StateController.getStateHoursPerEmployee);
    router.get('/ex/:_year',StateController.getStateExpenses)
    return router;
}; 