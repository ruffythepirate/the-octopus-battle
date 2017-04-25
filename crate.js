const CRATE_STATE_ENUM = {
  unattached: 0,
  attached: 1,
  fired: 2
};

function Crate(startX, startY, crateAstreoidImg) {

  var x =startX, y=startY, vx = 0, vy =0;

  const w = 50, h = 50;

  const firedRadius = 75;

  var color = '#FFFFFF';

  const MAX_SPEED = 3;

  var state = CRATE_STATE_ENUM.unattached;

  function render(canvas, ctx) {
    ctx.fillStyle = color;
    if(state === CRATE_STATE_ENUM.fired) {
      const base_image = new Image();

      // ctx.beginPath();
      // ctx.arc(x,y, firedRadius, 0,2*Math.PI);
      // ctx.stroke();
      //base_image.src = 'resources/comet.png';
      base_image.src = 'resources/meteor.png';
      ctx.drawImage(base_image, x, y, 3 * w, 3* h);
    } else {
      const base_image = new Image();

      //ctx.fillRect(x, y, w, h);

      base_image.src = crateAstreoidImg;
      ctx.drawImage(base_image, x, y, w, h);
    }
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

  const setSpeed = (speedVector) => {vx = speedVector.x; vy = speedVector.y}

  function launch(exitSpeed, player) {
      setSpeed(exitSpeed);
      belongToPlayer = player;
      state = FALLING_LETTER_STATE_ENUM.fired;
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
    getLetter: () => {return letter;},
    setPosition: (newX, newY) => {x = newX; y = newY;},
    getState: () => {return state;},
    setState: (newState) => {state = newState;},
    setSpeed: setSpeed,
    setOwner: setOwner,
    launch: launch,
    getBelongToPlayer: () => {return belongToPlayer;}
  };

  function update() {
    updateSpeed();
    updatePosition();

    if(state !== FALLING_LETTER_STATE_ENUM.attached
      && isOutOfScreen()) {
      game.destroyCrate(self)
    }
    if(state === FALLING_LETTER_STATE_ENUM.fired) {
    players.forEach(p => {
      const px = p.getX();
      const py = p.getY();

      const distance = Math.hypot(px -x, py -y);

      if(distance < firedRadius) {
        game.registerPlayerHit( p, self);        
      }
    })
    }
  }

  function isOutOfScreen() {
    return x > gameCanvas.width || x < 0 || y < 0 || y > gameCanvas.height;
  }



  return self;
}