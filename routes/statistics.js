const express = require('express');
const router = express.Router();
const statisticsController = require('@/controllers/statisticsController'); 


// GET /api/statistics 
router.get('/', statisticsController.getStatistics);
router.get('/:user_id/:year/:month', statisticsController.getUserActualWorkingHours);

// 테스트 라우트 먼저
// router.get('/', (req, res) => {
//   res.send('✅ 통계 API 라우터 작동 중');
// });
module.exports = router;
