const GAME_CONSTANTS = require('../../common/consts/gameConstants.js');

const Player = require('../../common/player.js');
const Controls = require('../../common/controls.js');
const Crate = require('../../common/crate.js');

const PadCollector = require('./gamepad-collector.js');

const game = require('../../common/game.js');
import GameRunner from './gameRunner.js';

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

const gameCanvas = document.getElementById('game-canvas');

  var playerColors = [
    'yellow',
    'orange',
    'purple',
    'lightblue',
    'blue',
    'maroon'
  ];

function createPlayer(controls) {
  return new Player(50, 100, playerColors[players.length], controls);
}

const players = [];

function checkWinCondition(players) {
  return false;
}

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

joinKeyboardOne();

const gameRunner = new GameRunner(gameCanvas, players, checkWinCondition, keyMap);
gameRunner.startGame();
