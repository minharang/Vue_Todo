const express = require('express');
const router = express.Router();
const comCdController = require('@controllers/comCdController'); 

// GET /api/comcd/:grpId
router.get('/:grpId', comCdController.getComCdByGrpId); 

module.exports = router;