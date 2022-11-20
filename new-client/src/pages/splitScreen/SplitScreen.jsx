import { useEffect } from 'react';
import './splitScreen.css';

import { playMusic } from '../../common/music.js';

import GameRunner from '../../common/gameRunner.js';
const Player = require('../../common/player.js');
const Controls = require('../../common/controls.js');
const Crate = require('../../common/crate.js');
const game = require('../../common/game.js');
const keyMap = {};
const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ALT: 18,
  CTRL: 17,
  A: 65,
  W: 87,
  D: 68,
  S: 83,
  F: 70,
};



const playerColors = [
    'yellow',
    'orange',
    'purple',
    'lightblue',
    'blue',
    'maroon'
];

const GAME_CONSTANTS = require('../../common/consts/gameConstants.js');

export default function SplitScreen({handleExit}) {


  useEffect(() => {
    document.getElementById('music').play();
  });

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
          {key: KEY.CTRL, value:'release'}
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
      return new Player(50, 100, playerColors[players.length], controls);
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
