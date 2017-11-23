const GameControl = require('./gamepad-controls.js');


function PadCollector() {

  const activeControllers = [];

  const controllerMapping = {};

  const gameControl = new GameControl();

  this.updateControls = function() {

    const pressedButtons = gameControl.getPressedControls();

    activeControllers.forEach(ac => {
      ac.up = 0;
      ac.down = 0;
      ac.left = 0;
      ac.right = 0;
      ac.a = 0;
    });

    pressedButtons
      .filter(pb => {
        return pb.gamepadIndex !== null;
      })
      .forEach(pb => {
        var controllerIndex = controllerMapping[pb.gamepadIndex];
        if (controllerIndex === undefined) {
          controllerIndex = registerController(pb.gamepadIndex);
        }
        const controller = activeControllers[controllerIndex];

        controller[pb.name.toLowerCase()] = pb.analogStickValue;
      });
  };

  this.getControls = function() {
    return activeControllers;
  };

  this.clearEvents = function() {
    gameControl.clearPressedControls();
  };

  function registerController(gamepadIndex) {
    activeControllers.push(createEmptyController(gamepadIndex));
    controllerMapping[gamepadIndex] = activeControllers.length - 1;
    return activeControllers.length - 1;
  }

  function createEmptyController(gamepadIndex) {
    return {
      id: gamepadIndex,
      up: 0.0,
      left: 0.0,
      down: 0,
      right: 0,
      a: 0
    };
  }
}

module.exports = PadCollector;