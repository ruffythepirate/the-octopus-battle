import { useEffect } from 'react';

import './practice.css';
import GameRunner from '../../common/gameRunner.js';
import playerColors from '../../common/playerColors.js';

import KEY from '../../common/consts/keyCodes.js';

const Player = require('../../common/player.js');
const Controls = require('../../common/controls.js');
const Crate = require('../../common/crate.js');
const game = require('../../common/game.js');
const keyMap = {};

const GAME_CONSTANTS = require('../../common/consts/gameConstants.js');

export default function JoinOnline({handleExit}) {

  function handleKeyPress(event) {
    const key = event.key;
    if(key === 'Escape') {
      handleExit();
    }
  }

  useEffect(() => {

  }, []);

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
      return new Player(50, 100, playerColors[players.length], controls);
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
