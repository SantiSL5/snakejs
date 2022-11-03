const express = require('express');
const router = express.Router();
const rankingController = require('../../controllers/controller_ranking');

//api/ranking

router.get('/', rankingController.getRankings);
router.get('/hs', rankingController.getHighscore);
router.get('/bs', rankingController.getBestScore);
router.post('/addScore', rankingController.addScore);
router.get('/ranking', rankingController.getRanking);

module.exports = router;