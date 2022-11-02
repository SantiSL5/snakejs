const express = require('express');
const router = express.Router();
const rankingController = require('../../controllers/controller_ranking');

//api/ranking

router.post('/', rankingController.getRanking);
router.post('/hs', rankingController.getHighscore);
router.post('/addScore', rankingController.addScore);
// router.delete('/:id', rankingController.deleteRanking);

module.exports = router;