import { useEffect } from 'react';
import GameRunner from '../../common/GameRunner.ts';
import playerColors from '../../common/consts/playerColors';
import KEY from '../../common/consts/keyCodes.js';
import { io } from 'socket.io-client';

const PlayerDto = require('@the-octopus-battle/common').PlayerDto;
const Controls = require('../../common/controls.js');
const keyMap = {};

const GAME_CONSTANTS = require('../../common/consts/gameConstants.js');


export default function JoinOnline({handleExit}) {

  function handleKeyPress(event) {
    const key = event.key;
    if(key === 'Escape') {
      handleExit();
    }
  }

  let socket = undefined;

  useEffect(() => {
    console.log("JoinOnline useEffect");
    socket = io('http://localhost:3030');

    socket.on('connected', (player) => {
      console.log('connected', player);
    });

    console.log('Sending request to get state...');
    socket.emit('state', {}, function(state) {
      console.log('state', state);
    });

    socket.on('state', (event) => {
      console.log('state', event);
    });


    return () => {
      console.log("JoinOnline useEffect cleanup");
      socket.disconnect();
    }
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
    const players = [];
    function createPlayer(controls) {
      const player = new PlayerDto(players.length);
      player.x = 50;
      player.y = 100;
      player.color = playerColors[player.id];
      player.controls = controls;
      return player
    }
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
