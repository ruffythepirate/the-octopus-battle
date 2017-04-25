const FALLING_LETTER_STATE_ENUM = {
  unattached: 0,
  attached: 1,
  fired: 2
};

function FallingLetter(startX, startY, letter) {

  var x =startX, y=startY, vx = 0, vy =0;

  const w = 10, h = 10;

  var color = '#FFFFFF';

  const MAX_SPEED = 3;



  var state = FALLING_LETTER_STATE_ENUM.unattached;

  function render(canvas, ctx) {
    ctx.font="30px Verdana";
// Create gradient
    ctx.fillStyle=color;

    ctx.fillText(letter, x, y);
  }

  function updateSpeed() {
    if(state === FALLING_LETTER_STATE_ENUM.unattached) {
      vy += GAME_CONSTANTS.g / 4;
      vy = Math.min(MAX_SPEED, vy);

    } else if(state === FALLING_LETTER_STATE_ENUM.fired) {
      vy += GAME_CONSTANTS.g;
    }
  }

  function updatePosition() {
    if(state !== FALLING_LETTER_STATE_ENUM.attached) {
      y += vy;
      x += vx;
      // y = y % gameCanvas.height;

    }
  }

 var belongToPlayer;

  const setSpeed = (speedVector) => {vx = speedVector.x; vy = speedVector.y}

  function launch(exitSpeed, player) {
      setSpeed(exitSpeed);
      belongToPlayer = player;
      state = FALLING_LETTER_STATE_ENUM.fired;

  }

  function contains(targetX, targetY) {
    var xIsOk = targetX > x && targetX < x + w;
    var yIsOk = targetY > y && targetY < y + h;
    return xIsOk && yIsOk;
  }

  var self ={
    getX: () => { return x + w /2;},
    getY: () => { return y + h /2;},
    render: render,
    update: update,
    contains: contains,
    getLetter: () => {return letter;},
    setPosition: (newX, newY) => {x = newX; y = newY;},
    getState: () => {return state;},
    setState: (newState) => {state = newState;},
    setSpeed: setSpeed,
    launch: launch,
    getBelongToPlayer: () => {return belongToPlayer;}
  };

  function update() {
    updateSpeed();
    updatePosition();

    if(state !== FALLING_LETTER_STATE_ENUM.attached
      && isOutOfScreen()) {
      game.destroyFallingLetter(self)
    }
  }

  function isOutOfScreen() {
    return x > gameCanvas.width || x < 0 || y < 0 || y > gameCanvas.height;
  }



  return self;
}