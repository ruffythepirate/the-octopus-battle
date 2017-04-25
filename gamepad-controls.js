(function () {
  const axesThreshold = 0.3;

  const defaultControlTypeConfig = {
    "Up": {
      id: 0,
      name: "Up",
      mozGamePadIndex: 0,
      chromeGamePadIndex: 12,
      keyCode: 38,
      analogStickValue: 0,
      gamepadIndex: null,
      analogStickValueCondition: ((value, index) => (value < (axesThreshold * -1) && index === 1))
    },
    "Down": {
      id: 1,
      name: "Down",
      mozGamePadIndex: 1,
      chromeGamePadIndex: 13,
      keyCode: 40,
      analogStickValue: 0,
      gamepadIndex: null,
      analogStickValueCondition: ((value, index) => (value > (axesThreshold) && index === 1))
    },
    "Left": {
      id: 2,
      name: "Left",
      mozGamePadIndex: 2,
      chromeGamePadIndex: 14,
      keyCode: 37,
      analogStickValue: 0,
      gamepadIndex: null,
      analogStickValueCondition: ((value, index) => (value < (axesThreshold * -1) && index === 0))
    },
    "Right": {
      id: 3,
      name: "Right",
      mozGamePadIndex: 3,
      chromeGamePadIndex: 15,
      keyCode: 39,
      analogStickValue: 0,
      gamepadIndex: null,
      analogStickValueCondition: ((value, index) => (value > axesThreshold && index === 0))
    },
    "Start": {
      id: 4,
      name: "Start",
      mozGamePadIndex: 4,
      chromeGamePadIndex: 9,
      analogStickValue: 0,
      gamepadIndex: null,
      key: "s",
    },
    "Select": {
      id: 5,
      name: "Select",
      mozGamePadIndex: 5,
      chromeGamePadIndex: 8,
      analogStickValue: 0,
      gamepadIndex: null,
    },
    "A": {
      id: 6,
      name: "A",
      mozGamePadIndex: 11,
      chromeGamePadIndex: 0,
      keyCode: 13,
      key: "a",
      analogStickValue: 0,
      gamepadIndex: null,
    },
    "B": {
      id: 7,
      name: "B",
      mozGamePadIndex: 12,
      chromeGamePadIndex: 1,
      key: "b",
      analogStickValue: 0,
      gamepadIndex: null,
    },
    "X": {
      id: 8,
      name: "X",
      mozGamePadIndex: 13,
      chromeGamePadIndex: 2,
      key: "x",
      analogStickValue: 0,
      gamepadIndex: null,
    },
    "Y": {
      id: 9,
      name: "Y",
      mozGamePadIndex: 14,
      chromeGamePadIndex: 3,
      key: "y",
      analogStickValue: 0,
      gamepadIndex: null,
    },
  };

  function GameControl(typeConfig) {
    let pressedControls = [];

    typeConfig = typeConfig || {};
    let controlTypes = Object.assign(defaultControlTypeConfig, typeConfig);

    function isChromeBrowser() {
      return (!!window.chrome && !!window.chrome.webstore);
    }

    function isFirefox() {
      return (!!window.InstallTrigger);
    }

function getControlTypeByCondition(condition) {
      let result = null;

     Object
        .keys(controlTypes)
        .forEach((type) => {
          let current = controlTypes[type];

         if (!result && condition(current)) {
            result = Object.assign({}, current);
          }
        });

     return result;
    }

    function isNotAlreadyPressed(controlType, gamepadIndex) {
      let found = false;

      pressedControls.forEach((control) => {
        if (control.id === controlType.id && control.gamepadIndex === gamepadIndex) {
          found = true;
        }
      });

      return !found;
    }

    function rememberPressedControlType(controlType, gamepadIndex) {
      if (controlType && isNotAlreadyPressed(controlType, gamepadIndex)) {
        
        if (controlType.analogStickValue === 0) {
          controlType.analogStickValue = 1;
        }

        controlType.gamepadIndex = gamepadIndex;
        pressedControls.push(controlType);
      }
    }

    function rememberButtonType(buttonIndex, gamepadIndex) {
      let ControlType = getControlTypeByCondition((type) => {
        let gamePadIndex;

        if (isFirefox()) {
          gamePadIndex = type.mozGamePadIndex;
        }

        if (isChromeBrowser()) {
          gamePadIndex = type.chromeGamePadIndex;
        }

        return (gamePadIndex === buttonIndex);
      });

      rememberPressedControlType(ControlType, gamepadIndex);
    }

    function handleGamePadButtons(gamepad, gamepadIndex) {
      gamepad.buttons.forEach((button, buttonIndex) => {
        if (!button.pressed) {
          return;
        }

        rememberButtonType(buttonIndex, gamepadIndex);
      });
    }

    function handleGamePadAxes(gamepad, gamepadIndex) {
      gamepad.axes.forEach((axeValue, axeIndex) => {
        let type = getControlTypeByCondition((type) => {
          return (type.analogStickValueCondition && type.analogStickValueCondition(axeValue, axeIndex));
        });

        if (type) {
          type.analogStickValue = Math.abs(axeValue); // always positive
        }

        rememberPressedControlType(type, gamepadIndex);
      });
    }

    function collectPressedGamePadButtons() {
      let gamepads = scanForGamepads();

      for (let gamepadIndex = 0; gamepadIndex < gamepads.length; gamepadIndex++) {
        let gamepad = gamepads[gamepadIndex];

        if (!gamepad) {
          return;
        }

        handleGamePadButtons(gamepad, gamepadIndex);
        handleGamePadAxes(gamepad, gamepadIndex);
      }
    }

    function isPressed(buttonType) {
      let result = false;

      collectPressedGamePadButtons();
      pressedControls.forEach((button) => {
        if (button.id === buttonType.id) {
          result = true;
        }
      });

      return result
    }

    function clearPressedControls() {
      pressedControls = [];
    }

    function scanForGamepads() {
      let gamepads = (navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []));
      return ((gamepads && gamepads.length > 0) ? gamepads : []);
    }

    window.addEventListener("gamepadconnected", (e) => {
      console.log("GameControlls: Gamepad connected at index %d: %s", e.gamepad.index, e.gamepad.id);
    });

    window.addEventListener("gamepaddisconnected", function (e) {
      console.log("GameControlls: Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
    });

    // window.addEventListener("keydown", (e) => {
    //   let typeByKeydown = getControlTypeByCondition((current) => e.keyCode === current.keyCode) || getControlTypeByCondition((current) => e.key === current.key);

    //   if (typeByKeydown !== null) {
    //     pressedControls.push(typeByKeydown);
    //   } else {
    //     console.log("no key mapping for key event: ", e);
    //   }
    // });

    this.isPressed = isPressed;
    this.types = controlTypes;
    this.clearPressedControls = clearPressedControls;
    this.getFirstPressedControl = (() => {
      collectPressedGamePadButtons();

      return pressedControls[0];
    });
    this.getPressedControls = (() => {
      collectPressedGamePadButtons();

      return pressedControls;
    })
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = GameControl;
  } else if (typeof window !== "undefined") {
    window.GameControl = GameControl;
  }

}());