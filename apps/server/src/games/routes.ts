import { Router } from 'express';
const router = Router();

import gameService from './gameService';

router.post('/online-players', (req, res) => {
    let game = gameService.joinGame();
    res.json(game);
});

export default router;
