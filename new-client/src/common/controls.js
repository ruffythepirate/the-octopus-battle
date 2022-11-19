function Controls(player, commands) {
  this.commands = commands;
  this.player = player;

  var controls = {
    up: 0,
    right: 0,
    down: 0,
    left: 0,
    a: 0
  };

  player.setControls(controls);

  this.actions = {
    up: (down) => {
      controls.up = down ? 1 : 0;
    },
    right: (down) => {
      controls.right = down ? 1 : 0;
    },
    down: (down) => {
      controls.down = down ? 1 : 0;
    },
    left: (down) => {
      controls.left = down ? 1 : 0;
    },
    release: (down) => {
      if(down) {
        this.player.releaseCrate();
      }
    },
  };
}

Controls.prototype = {
  registerControls: function (controlMap) {
    this.commands.forEach(c => {
      controlMap[c.key] = this.actions[c.value];
    });
  }
};

module.exports = Controls;