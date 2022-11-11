const GAME_CONSTANTS = require('./consts/gameConstants.js');
const CRATE_STATE_ENUM = require('./consts/crateEnum.js');

const game = require('./game.js');

function Crate(startX, startY, crateAstreoidImg) {

  var x =startX, y=startY, vx = 0, vy =0;

  const w = 50, h = 50;

  const firedRadius = 75;

  var color = '#FFFFFF';

  const MAX_SPEED = 3;

  var state = CRATE_STATE_ENUM.unattached;

  function render(canvas, ctx) {
    ctx.fillStyle = color;
    renderAsCircle(ctx)
/*    if(state === CRATE_STATE_ENUM.fired) {
      const base_image = new Image();
      base_image.src = 'resources/meteor.png';
      ctx.drawImage(base_image, x, y, 3 * w, 3* h);
    } else {
      const base_image = new Image();

      base_image.src = crateAstreoidImg;
      ctx.drawImage(base_image, x, y, w, h);
    }*/
  }

  function renderAsCircle(ctx) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x,y,w /2,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
  }

  function updateSpeed() {
    if(state === CRATE_STATE_ENUM.unattached) {
      vy += GAME_CONSTANTS.g / 4;
      vy = Math.min(MAX_SPEED, vy);

    } else if(state === CRATE_STATE_ENUM.fired) {
      vy += GAME_CONSTANTS.g;
    }
  }

  function updatePosition() {
    if(state !== CRATE_STATE_ENUM.attached) {
      y += vy;
      x += vx;
    }
  }

  function contains(targetX, targetY) {
    var xIsOk = targetX > x && targetX < x + w;
    var yIsOk = targetY > y && targetY < y + h;
    return state !== CRATE_STATE_ENUM.fired && xIsOk && yIsOk;
  }

  var belongToPlayer;

  const setSpeed = (speedVector) => {vx = speedVector.x; vy = speedVector.y;};

  function launch(exitSpeed, player) {
    setSpeed(exitSpeed);
    belongToPlayer = player;
    state = CRATE_STATE_ENUM.fired;
  }

  function setOwner(player) {
    belongToPlayer = player;
  }

  var self ={
    getX: () => { return x + w /2;},
    getY: () => { return y + h /2;},
    render: render,
    update: update,
    contains: contains,
    setPosition: (newX, newY) => {x = newX; y = newY;},
    getState: () => {return state;},
    setState: (newState) => {state = newState;},
    setSpeed: setSpeed,
    setOwner: setOwner,
    launch: launch,
    getBelongToPlayer: () => {return belongToPlayer;}
  };

  function update(canvas, crates, players) {
    updateSpeed();
    updatePosition();

    if(state !== CRATE_STATE_ENUM.attached
      && isOutOfScreen(canvas)) {
      game.destroyCrate(self);
    }
    if(state === CRATE_STATE_ENUM.fired) {
      players.forEach(p => {
        const px = p.getX();
        const py = p.getY();

        const distance = Math.hypot(px -x, py -y);

        if(distance < firedRadius) {
          game.registerPlayerHit( p, self);        
        }
      });
    }
  }

  function isOutOfScreen(gameCanvas) {
    return x > gameCanvas.width || x < 0 || y < 0 || y > gameCanvas.height;
  }



  return self;
}

module.exports = Crate;
