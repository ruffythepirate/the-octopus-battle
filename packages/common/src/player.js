const GAME_CONSTANTS = require('./consts/gameConstants.js');

const Rope = require('./rope.js');

function Player(startX, startY, color, controls) {
  var health = 100;

  var x = startX;
  var y = startY;

  var vx = 0.0;
  var vy = 0.0;

  var ax = 0.0;
  var ay = 0.0;

  var w = 35;
  var h = 35;

  let attachedCrate = null;

  this.getX = getX;
  this.getY = getY;

  var rope = new Rope(this);

  function getX() {
    return x + w / 2;
  }

  function getY() {
    return y + h / 2;
  }

  function getHealth(){
    return health;
  }

  function setHealth(newHealth){
    health = newHealth;
  }

  function addDamage(damage) {
    health -= damage;
    health = Math.max(0, health);
  }

  function update(canvas, crates) {

    applyControls();

    updateSpeed();
    updatePosition(canvas);

    updateCarriedCrate(crates);

    rope.update();


  }

  function applyControls() {
    ax = 0;
    ay = 0;
    ax -= controls.left * GAME_CONSTANTS.hAcceleration;
    ax += controls.right * GAME_CONSTANTS.hAcceleration;
    ay -= controls.up * GAME_CONSTANTS.vAcceleration;
    ay += controls.down * GAME_CONSTANTS.vAcceleration;

    if(controls.a) {
      releaseCrate();
    }
  }

  function updateCarriedCrate(crates) {
    if( !attachedCrate) {
      const crateToCapture = crates.find(c => {
        return rope.overlapsCrate(c);
      });
      if(crateToCapture) {
        setCrate(crateToCapture);
      }
    }
  }


  let base_image = null;

  try {
    initializeImage();
  } catch (e) {
    console.err(`Failed to initialize image ${color}`);
  }

  function initializeImage() {
    base_image = new Image();
    base_image.src = `resources/${color}_small.png`;
  }

  function renderAsCircle(ctx) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(getX(),getY(),w /2,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
  }

  function render(canvas, ctx) {
    if(base_image) {
      ctx.drawImage(base_image, x, y, w, h);
    } else {
      renderAsCircle(ctx);
    }

    rope.render(canvas, ctx);
  }

  function updateSpeed() {
    vx += ax;
    vy += ay + GAME_CONSTANTS.g;

    vx *= GAME_CONSTANTS.hFriction;
    vy *= GAME_CONSTANTS.vFriction;

    if (Math.abs(vx) < GAME_CONSTANTS.hStabilize) {
      vx = 0;
    }
  }

  function setControls(newControls) {
    controls = newControls;
  }

  function reset() {
    x = startX;
    y = startY;
    ax = 0;
    ay = 0;
    vx = 0;
    vy = 0;
    setCrate(null);
  }


  var self = {
    render: render,
    update: update,
    setControls: setControls,
    releaseCrate: releaseCrate,
    getX: getX,
    getY: getY,
    getHealth: getHealth,
    setHealth: setHealth,
    addDamage: addDamage,
    getColor: getColor,
    setCrate: setCrate,
    setAx: (newAX) => {ax = newAX;},
    setAy: (newAY) => {ay = newAY;},
    setPosition: () => {},
    reset: reset
  };

  function releaseCrate() {
    if(attachedCrate) {
      const exitSpeed = rope.getRopeEndSpeed();
      attachedCrate.launch(exitSpeed, self);
      setCrate(null);
    }
  }

  function setCrate(crate) {

    if(crate) {
      if( crate.getBelongToPlayer()) {
        const otherPlayer = crate.getBelongToPlayer();
        otherPlayer.setCrate(null);
      }
      crate.setOwner(self);
    }
    attachedCrate = crate;
    rope.setCrate(crate);
  }

  function updatePosition(gameCanvas) {
    x += vx;
    y += vy;

    x = Math.max(x, 0);
    x = Math.min(x, gameCanvas.width - w);
    y = Math.max(y, 0);
    y = Math.min(y, gameCanvas.height - h);
  }

  function getColor (){
    return color;
  }

  return self;
}


module.exports = Player;
