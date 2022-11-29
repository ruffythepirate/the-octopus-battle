import { useEffect } from 'react';

import './practice.css';
import GameRunner from '../../common/GameRunner.ts';
import playerColors from '../../common/consts/playerColors';
const PlayerDto = require('@the-octopus-battle/common').PlayerDto;
const Controls = require('../../common/controls.js');
const keyMap = {};
const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ALT: 18,
  CTRL: 17,
  SPACE: 32,
  A: 65,
  W: 87,
  D: 68,
  S: 83,
  F: 70,
};

export default function Practice({handleExit}) {

  function handleKeyPress(event) {
    const key = event.key;
    if(key === 'Escape') {
      handleExit();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  });

  useEffect(() => {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) {
      return;
    }
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    let keyboardOneJoined = false;
    function joinKeyboardOne() {
      if(!keyboardOneJoined) {
        var player = createPlayer();
        var firstControls = new Controls(player, [
          {key: KEY.LEFT, value:'left'},
          {key: KEY.UP, value:'up'},
          {key: KEY.RIGHT, value:'right'},
          {key: KEY.DOWN, value:'down'},
          {key: KEY.SPACE, value:'release'}
        ]);
        players.push(player);

        firstControls.registerControls(keyMap);
        keyboardOneJoined = true;
      }
    }
    function createPlayer(controls) {
      const player = new PlayerDto(50, 100, playerColors[players.length], controls);
      player.x = 50;
      player.y = 100;
      player.color = playerColors[players.length];
      return player
    }

    const players = [];
    function checkWinCondition(players) {
      return false;
    }

    joinKeyboardOne();
    const gameRunner = new GameRunner(canvas, players, checkWinCondition, keyMap);
    gameRunner.startGame();

  });

return (<div id="overlay" className="fullSize">
      <canvas id='game-canvas' className="fullSize"></canvas>
  </div>);
}
