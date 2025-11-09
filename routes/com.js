const express = require('express');
const router = express.Router();
const comController = require('@/controllers/comController'); 

// GET /api/com/getCurrentUser
router.get('/getCurrentUser', comController.getCurrentUser); 

// GET /api/com/:grpId
router.get('/:grpId', comController.getComCdByGrpId); 

module.exports = router;