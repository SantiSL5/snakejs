const express = require('express');
const router = express.Router();
const rankingController = require('../../controllers/controller_ranking');

//api/ranking

router.get('/', rankingController.getRankings);
router.post('/addScore', rankingController.addScore);
// router.get('/:id', rankingController.getRanking);
// router.put('/:id', rankingController.updateRanking);
// router.delete('/:id', rankingController.deleteRanking);

module.exports = router;