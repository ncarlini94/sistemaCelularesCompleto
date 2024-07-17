const express = require('express');
const router = express.Router();
const { importNumbersFile, importJurisdictionsFile, importRepartitionsFile, importUsersFile } = require('../controllers/import.Controller');

router.post('/importNumbers', importNumbersFile);
router.post('/importUsers', importUsersFile);
router.post('/importJurisdictions', importJurisdictionsFile);
router.post('/importRepartitions', importRepartitionsFile);

module.exports = router;