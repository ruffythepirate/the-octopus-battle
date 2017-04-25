function PlayerGameLetter (letter, colourWhenActive) {

  const w = 22, h = 42;
  var x, y;
  const inactiveColor = '#333333';

  var isActive = false;

  function setPosition(newX, newY) {
    x = newX;
    y = newY;
  }

  function render(context) {
    context.fillStyle = '#000000';

    context.fillRect(x, y, w, h);

    if(isActive) {
      context.fillStyle = colourWhenActive;
    } else {
      context.fillStyle = inactiveColor;
    }


    context.font="22px Verdana";
    context.fillText(letter, x + 4, y + 28);
  }

  function update () {

  }

  function checkShouldActivate(fallingLetter) {
    // if(fallingLetter.getState() !== FALLING_LETTER_STATE_ENUM.fired) {
    //   return false;
    // }
    var lx = fallingLetter.getX();
    var ly = fallingLetter.getY();

    return lx > x && lx < x + w
        && ly > y && ly < y + h
        && fallingLetter.getLetter() === letter;
  }

  return {
    render: render,
    checkShouldActivate: checkShouldActivate,
    activate: () => {isActive = true;},
    isActive: () => {return isActive;},
    setPosition: setPosition,
    update: update
  }
}

function PlayerGameWord(player, word) {

  const w = word.length * 30;
  const h = 50;

  var x = 0, y = 0;

  const wordLetters = word.split('').map(l => {return new PlayerGameLetter(l, player.getColor())});


  function render(canvas, context) {
    context.fillStyle = player.getColor();
    context.fillRect(x, y, w, h);

    wordLetters.forEach(l => {
      l.render(context);
    });
  }

  function update () {

  }

  function setPosition(newX, newY) {
    x = newX;
    y = newY;
    wordLetters.forEach((l, i) => {
      l.setPosition(x + 30 * i + 4, y+ 4);
    })

  }

  function checkShouldActivateLetters(fallingLetters) {

    var hasActivated = false;
    fallingLetters.forEach(fl => {
        wordLetters.forEach(wl => {
          if(wl.checkShouldActivate(fl)) {
            wl.activate();
            hasActivated = true;
          }
        });
      });

    if(hasActivated) {
      updateBackground();
    }
  }

  function getWidth() {
    return w;
  }

  return {
    getWidth: getWidth,
    setPosition: setPosition,
    checkShouldActivateLetters: checkShouldActivateLetters,
    render: render,
    update: update
  }
}