function Window(startX, startY, width, height) {

  var color = "#003468";

  var isAlreadyUsed = false;

  function render(context) {
    context.fillStyle = color;
    context.beginPath();
    context.rect(startX, startY, width, height);
    context.fill();
    context.closePath();
  }

  function checkHasScored(player) {
    if(isAlreadyUsed) {
      return false;
    }
    const x = player.getX();
    const y = player.getY();

    var xIsOk = x > startX && x < startX + width;
    var yIsOk = y > startY && y < startY + height;

    return xIsOk && yIsOk;
  }

  function lightWindow() {
    color = "#f8f807";
    isAlreadyUsed = true;
  }

  return {
    render: render,
    lightWindow: lightWindow,
    checkHasScored: checkHasScored
  };
}

function Apartment(startX, startY) {
  const WINDOW_CONST = {
    windowColumnCount: 3,
    windowRowCount: 3,
    windowWidth: 75,
    windowHeight: 50,
    windowOffsetLeft: 148,
    windowOffsetTop: 300,
    windowPadding: 35
  };

  const windows = [];

  initializeWindows(WINDOW_CONST.windowColumnCount, WINDOW_CONST.windowRowCount);

  function initializeWindows(columns, rows) {
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows; r++) {

        var windowX = startX + (c * (WINDOW_CONST.windowWidth + WINDOW_CONST.windowPadding)) + WINDOW_CONST.windowOffsetLeft;
        var windowY = startY + (r * (WINDOW_CONST.windowHeight + WINDOW_CONST.windowPadding)) + WINDOW_CONST.windowOffsetTop;
        const newWindow = new Window(windowX, windowY, WINDOW_CONST.windowWidth, WINDOW_CONST.windowHeight);
        windows.push(newWindow);
      }
    }
  }


  function render(canvas, context) {
    context.strokeStyle = "black";
    context.lineWidth = "3";
    context.save();

    renderRoof(context);
    renderWalls(context);
    renderWindows(context);
    renderDoor(context);
  }

  function renderRoof(context) {
    context.beginPath();
    context.moveTo(startX + 100, startY + 260);
    context.lineTo(startX + 300, startY + 45);
    context.lineTo(startX + 500, startY + 260);
    context.closePath();
    context.fillStyle = "#ff7500";
    context.fill();
    context.stroke();
    renderChimney(context);

  }

  function renderChimney(context) {
    context.fillRect(startX + 381, startY + 60, 45, 120);
    context.strokeRect(startX + 381, startY + 60, 45, 140);
    context.fillRect(startX + 378, startY + 198, 55, 5);
  }

  function renderWalls(context) {
    context.fillStyle = "#ffffff";
    context.fillRect(startX + 100, startY + 260, 400, 400);
    context.strokeRect(startX + 100, startY + 260, 400, 400);
  }

  function renderDoor(context) {
    context.beginPath();
    context.fillRect(startX + 258, startY + 550, 80, 110);
    context.strokeRect(startX + 258, startY + 550, 80, 110);
    context.moveTo(startX + 298, startY + 550);
    context.lineTo(startX + 298, startY + 662);
    context.stroke();

    renderDoorHandles(context);
  }

  function renderDoorHandles(context) {
    context.beginPath();
    context.arc(startX + 285, startY + 600, 5, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.arc(startX + 310, startY + 600, 5, 0, 2 * Math.PI);
    context.stroke();
  }

  function renderWindows(ctx) {
    ctx.fillStyle = "#003468";
    windows.forEach(w => {
      w.render(ctx);
    })
  }

  // var x=canvas.width/2;
  //  var y=canvas.height-30;
  //  var dx=2;
  //  var dy=-2;

  function checkHasScored(players) {

    var someoneScored = false;
    players.forEach(p => {
      windows.forEach(w => {
        const hasScored = w.checkHasScored(p);
        if(hasScored) {
          p.addScore(10);
          w.lightWindow();
          someoneScored = true;
        }
      });
    });

    if(someoneScored) {
      updateBackground();
    }

  }

  return {
    render: render,
    checkHasScored: checkHasScored
  }
}




