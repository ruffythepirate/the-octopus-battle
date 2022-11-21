const router = require('express').Router();

import { joinGame } from './gameService';

router.post('/online-players', (req, res) => {
    let game = joinGame();
    res.json(game);
});

module.exports = router;
