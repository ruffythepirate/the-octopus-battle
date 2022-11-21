import { Router } from 'express';
const router = Router();

import { joinGame } from './gameService.mjs';

router.post('/online-players', (req, res) => {
    let game = joinGame();
    res.json(game);
});

export default router;
