import './practice.css';
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

export default function Practice({handleExit}) {

  function handleKeyPress(event) {
    const key = event.key;
    if(key === 'Escape') {
      handleExit();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
  });

  useeffect(() => {
    const canvas = document.getElementById('game-canvas');
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
    function createPlayer(controls) {
      return new Player(50, 100, playerColors[players.length], controls);
    }
    const players = [];
    function checkWinCondition(players) {
      return false;
    }

    joinKeyboardOne();
    const gameRunner = new GameRunner(gameCanvas, players, checkWinCondition, keyMap);
    gameRunner.startGame();

  }, []);

return (<div id="overlay" class="fullSize">
      <canvas id='game-canvas' class="fullSize"></canvas>
  </div>);
}
