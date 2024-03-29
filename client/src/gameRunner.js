const game = require('../../common/game');
import KEY from '../../common/consts/keyCodes.js';

export default function GameRunner(gameCanvas, players, checkWinCondition, keyMap) {
  const GAME_CONSTANTS = require('../../common/consts/gameConstants.js');

  const Crate = require('../../common/crate.js');

  const PadCollector = require('./gamepad-collector.js');

  var astreoids = [
    'resources/astreoid.png',
    'resources/dangerousAstreoid.png'
  ];

  var shouldRerenderBackground = false;

  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;

  var renderContext = gameCanvas.getContext('2d');

  var playerAreaStartX = 0;


  game.destroyCrate = function (crate) {
    removeFromArray(crates, crate);
    removeFromArray(gameItems, crate);
  };

  game.registerPlayerHit = function (player) {
    player.addDamage(GAME_CONSTANTS.damagePerHit);

    killPlayer(player);
    scheduleRespawn(player);
    updateBackground();
  };

  function killPlayer(player) {
    removeFromArray(gameItems, player);
    player.setPosition(-500, -500);
  }

  function scheduleRespawn(player) {
    window.setTimeout( () => {
      player.reset();
      if(player.getHealth() > 0 && gameItems.indexOf(player) === -1) {

        gameItems.push(player);
      }
    },
    GAME_CONSTANTS.playerRespawnTime * 1000);
  }

  function removeFromArray(array, item) {
    if(array) {
      var index = array.indexOf(item);
      if ( index > -1 ) {
        array.splice(index, 1);
      }
    }

  }




  var gameItems = [];
  var crates = [];

  var backgroundCanvas = renderToCanvas(gameCanvas.width, gameCanvas.height, renderBackground);

  (function() {
    var onEachFrame;
    if (window.webkitRequestAnimationFrame) {
      onEachFrame = function(cb) {
        var _cb = function() { cb(); window.webkitRequestAnimationFrame(_cb); };
        _cb();
      };
    } else if (window.mozRequestAnimationFrame) {
      onEachFrame = function(cb) {
        var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); };
        _cb();
      };
    } else {
      onEachFrame = function(cb) {
        setInterval(cb, 1000 / 60);
      };
    }

    window.onEachFrame = onEachFrame;
  })();

  document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
  document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

  function onkey(ev, key, down) {
    if(keyMap[key]){
      keyMap[key](down);
    } 

    if(!game.isRunning) {
      if(key === 13) {
        startGame();
      } else if (key === KEY.F) {
        joinKeyboardTwo();
        updateBackground();
      } else if (key === KEY.ALT) {
        joinKeyboardOne();
        updateBackground();
      }
    }
    return true;
  }




  window.onEachFrame(mainGameLoop);


  function scheduleCrate() {
    const timeoutTime = GAME_CONSTANTS.letterSpawnFrequency +  (Math.random() - 0.5) * GAME_CONSTANTS.letterSpawnFrequency;
    window.setTimeout(() => {
      generateCrate();
      scheduleCrate();
    }, timeoutTime * 1000);
  }

  function generateCrate() {
    const x = playerAreaStartX + Math.random() * (gameCanvas.width - playerAreaStartX);
    const y = Math.random() * (gameCanvas.height);
    const imgSrc = generateAstreoidImageSrc();
    const crate = new Crate(x, y, imgSrc);
    gameItems.push(crate);
    crates.push(crate);
  }

  scheduleCrate();

  function startGame() {
    players.forEach(p => {
      p.setHealth(100);
      p.reset();
    });

    gameItems = [];
    players.forEach(p => { gameItems.push(p);});

    game.isRunning = true;

    updateBackground();
  }

  function generateAstreoidImageSrc() {
    const astreoidIndex = Math.floor(Math.random() * astreoids.length);
    return astreoids[astreoidIndex];
  }

  function mainGameLoop() {

    const padControls = new PadCollector();
    
    //renderContext.drawImage(video, 0, 0, gameCanvas.width, gameCanvas.height);
    renderContext.fillStyle = "black"
    renderContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    gameItems.forEach(i => {i.update(gameCanvas, crates, players);});
    renderContext.drawImage(backgroundCanvas, 0, 0);
    gameItems.forEach(i => {i.render(gameCanvas, renderContext);});

    if(shouldRerenderBackground) {
      rerenderBackground();
    }

    if(game.isRunning) {
      if(checkWinCondition(players)) {
        endGame();
      }
    }

    padControls.updateControls();

    if(!game.isRunning) {
      padControls.getControls().filter(c => {
        return c.a;
      }).forEach(registerGameControllerPlayer);

    }

    padControls.clearEvents();
  }

  var gameControllerPlayers = [];
  function registerGameControllerPlayer(controls) {
    if(gameControllerPlayers.indexOf(controls.id) === -1) {
      gameControllerPlayers.push(controls.id);
      const player = createPlayer(controls);
      players.push(player);
      updateBackground();
    }
  }

  function endGame() {

    keyboardOneJoined = false;
    keyboardTwoJoined = false;

    players = [];
    gameControllerPlayers = [];
    game.isRunning = false;
    rerenderBackground();
  }

  function renderBackground(canvas, context) {

    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    renderTitle(context);

    if(!game.isRunning) {
      renderPressToStartText(context);
    }

    renderHealthBars(context);
  }

  function renderPressToStartText(ctx) {
    var title = 'Press F, ALT or A on Controller to Join. \nEnter To Start!';
    ctx.font='50px Verdana';

    const textMeasures = ctx.measureText(title);

    var gradient= ctx.createLinearGradient(0, 0, textMeasures.width, 0);
    gradient.addColorStop('0','orange');
    gradient.addColorStop('0.5','blue');
    gradient.addColorStop('1.0','orange');
    ctx.fillStyle=gradient;

    ctx.fillText(title, (gameCanvas.width - textMeasures.width)/ 2, (gameCanvas.height - 50)/2);
  }

  function renderHealthBars(context) {
    const healthBarWidth = 200;
    players.forEach((p, i) => {
      context.fillStyle = p.getColor();
      const healthWidth = Math.floor(healthBarWidth * p.getHealth() / 100.0);
      const damageWidth = healthBarWidth - healthWidth;
      context.fillRect(20, 35 + i * 20, healthWidth, 15);
      context.fillStyle = 'red';
      context.fillRect(20 + healthWidth, 35 + i * 20, damageWidth, 15);
      context.strokeStyle = 'black';
      context.strokeRect(20, 35 + i * 20, healthBarWidth, 15);


    });
  }

  function renderTitle(ctx) {
    var title = 'Players';
    ctx.font='20px Verdana';
    // Create gradient
    const textMeasures = ctx.measureText(title);

    var gradient= ctx.createLinearGradient(0, 0, textMeasures.width, 0);
    gradient.addColorStop('0','orange');
    gradient.addColorStop('0.5','blue');
    gradient.addColorStop('1.0','orange');
    // Fill with gradient
    ctx.fillStyle=gradient;

    ctx.fillText(title, 20, 20);
  }

  function renderToCanvas(width, height, render, canvas) {
    canvas = canvas || createCanvas(width, height, canvas);
    render(canvas, canvas.getContext('2d'));
    return canvas;
  }

  function createCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }


  function rerenderBackground() {
    backgroundCanvas = renderToCanvas(gameCanvas.width, gameCanvas.height, renderBackground, backgroundCanvas);
    shouldRerenderBackground = false;
  }

  function updateBackground() {
    shouldRerenderBackground = true;
  }
  return this;
}
