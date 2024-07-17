const express = require('express');
const router = express.Router();
const {
    querySearchJurisdiction,
    querySearchJurisdictions,
    queryAddJurisdiction,
    queryDeleteJurisdiction,
    queryAddRepartition,
    querySearchRepartition,
    querySearchRepartitions,
    queryDeleteRepartition,
    queryGetNumbers,
    queryUpdateNumber,
    queryAddNumber,
    queryDeleteNumber,
    queryGetPlans,
    queryUpdatePlan,
    queryAddPlan,
    queryDeletePlan,
    queryGetNumberHistory,
    queryUpdateJurisdiction,
    queryGetNumbersForRol,
    queryChangeDevice,
    queryGetNumber,
    queryGetValuesForDashboard,
} = require('../controllers/query.Controller');
const { authRequired } = require('./../middlewares/validateToken')

// Lineas

router.get('/number/:id', authRequired, queryGetNumber)

router.get('/numbers', queryGetNumbers)

router.get('/numbers/rol', authRequired, queryGetNumbersForRol)

router.put('/number/:id', authRequired, queryUpdateNumber);

router.post('/number', authRequired, queryAddNumber);

router.delete('/number/:id', authRequired, queryDeleteNumber)

// Equipo

router.put('/device/:id', authRequired, queryChangeDevice)

// Planes

router.get('/plans', authRequired, queryGetPlans)

router.put('/plan/:id', authRequired, queryUpdatePlan);

router.post('/plan', authRequired, queryAddPlan);

router.delete('/plan/:id', authRequired, queryDeletePlan)

// Jurisdicciones

router.get('/jurisdiction/:id', authRequired, querySearchJurisdiction)

router.get('/jurisdictions', authRequired, querySearchJurisdictions)

router.post('/jurisdiction', authRequired, queryAddJurisdiction)

router.put('/jurisdiction/:id', authRequired, queryUpdateJurisdiction);

router.delete('/jurisdiction/:id', authRequired, queryDeleteJurisdiction)

// Ruta de Reparticiones

router.get('/repartition/:id', authRequired, querySearchRepartition)

router.get('/repartitions', authRequired, querySearchRepartitions)

router.post('/repartition', authRequired , queryAddRepartition)

router.delete('/repartition/:id', authRequired, queryDeleteRepartition)

// History

router.get('/number/history/:id', authRequired, queryGetNumberHistory);

// Dashboard

router.get('/dashboard', authRequired, queryGetValuesForDashboard)




module.exports = router;