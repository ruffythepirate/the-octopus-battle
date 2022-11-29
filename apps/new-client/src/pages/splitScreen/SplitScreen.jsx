import { useEffect } from 'react';
import './splitScreen.css';
import playerColors from '../../common/consts/playerColors.js';

import KEY from '../../common/consts/keyCodes.js';

import GameRunner from '../../common/GameRunner.ts';
const { PlayerDto } = require('@the-octopus-battle/common');
const Controls = require('../../common/controls.js');
const keyMap = {};

const GAME_CONSTANTS = require('../../common/consts/gameConstants.js');

export default function SplitScreen({handleExit}) {

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

    let keyboardTwoJoined = false;
    function joinKeyboardTwo() {
      if(!keyboardTwoJoined) {
        var player2 = createPlayer();
        var secondControls = new Controls(player2, [
          {key: KEY.A, value:'left'},
          {key: KEY.W, value:'up'},
          {key: KEY.D, value:'right'},
          {key: KEY.S, value:'down'},
          {key: KEY.F, value:'release'}
        ]);
        secondControls.registerControls(keyMap);
        players.push(player2);
        keyboardTwoJoined = true;
      }
    }

    function createPlayer(controls) {
      const player = new PlayerDto(players.length);
      player.x = 50;
      player.y = 100;
      player.color = playerColors[player.id];
      player.controls = controls;
      return player
    }
    const players = [];
    function checkWinCondition(players) {
      return false;
    }

    joinKeyboardOne();
    joinKeyboardTwo();
    const gameRunner = new GameRunner(canvas, players, checkWinCondition, keyMap);
    gameRunner.startGame();
  });

return (<div id="overlay" className="fullSize">
      <canvas id='game-canvas' className="fullSize"></canvas>
  </div>);
}
