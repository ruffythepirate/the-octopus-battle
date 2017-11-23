const CRATE_STATE_ENUM = require('./consts/crateEnum.js');

var Point = function (x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype =
{
  add: function (point) {
    this.x += point.x;
    this.y += point.y;
  },

  subtract: function (point) {
    this.x -= point.x;
    this.y -= point.y;
  },

  scale: function (multiplier) {
    this.x *= multiplier;
    this.y *= multiplier;
  },

  min: function (x, y) {
    if (this.x < x)
      this.x = x;
    if (this.y < y)
      this.y = y;

  },

  max: function (x, y) {
    if (this.x > x)
      this.x = x;
    if (this.y > y)
      this.y = y;
  },

  copy: function (point) {
    this.x = point.x;
    this.y = point.y;
  },
  clone: function () {
    return new Point(this.x, this.y);
  },

  init: function () {
    this.x = this.y = 0;
  }
};

var Constraint = function (element, distance) {
  this.element = element;
  this.distance = distance;
};

var Particle = function (left, top) {

  var currentPoint = new Point(left, top);
  var lastPoint = new Point(left, top);
  var forcePoint = new Point(0, 0);

  var constraints = [];

  var getX = function () {
    return currentPoint.x;
  };

  var getY = function () {
    return currentPoint.y;
  };

  var verlet = function (timeStep) {

    var calcPoint = new Point(0, 0);
    var tempPoint = new Point(0, 0);

    tempPoint.copy(currentPoint);
    calcPoint.add(currentPoint);
    calcPoint.subtract(lastPoint);
    forcePoint.scale(timeStep * timeStep);
    calcPoint.add(forcePoint);
    currentPoint.add(calcPoint);

    lastPoint.copy(tempPoint);
  };

  var addConstraint = function (constraint) {
    constraints.push(constraint);
  };

  var applyForce = function (force) {
    forcePoint = force;
  };

  var applyDelta = function (dpoint) {
    currentPoint.add(dpoint);
  };

  var satisfyConstraints = function () {
    for (var i = 0; i < constraints.length; i++) {
      var dx = currentPoint.x - constraints[i].element.getX();
      var dy = currentPoint.y - constraints[i].element.getY();
      var d1 = Math.sqrt((dx * dx) + (dy * dy));
      var d2 = 0;
      if (d1 != 0) {
        d2 = 0.5 * (d1 - constraints[i].distance) / d1;
      }
      var dpoint = new Point(dx * d2, dy * d2);
      currentPoint.subtract(dpoint);
      if (constraints[i].element.applyDelta) {
        constraints[i].element.applyDelta(dpoint);
      }
      else {
        currentPoint.subtract(dpoint);
      }
    }
    // if (currentPoint.x < 2) currentPoint.x = 2;
    // if (currentPoint.x > canvas.width  -20) currentPoint.x = canvas.width - 20;
    // if (currentPoint.y < 2) currentPoint.y = 2;
    // if (currentPoint.y > canvas.height - 2) currentPoint.y = canvas.height - 2;
  };

  return {
    getX: getX,
    getY: getY,
    getLastSpeed: () => {
      var speed = currentPoint.clone();
      speed.subtract(lastPoint);
      return speed;
    },
    verlet: verlet,
    addConstraint: addConstraint,
    applyForce: applyForce,
    satisfyConstraints: satisfyConstraints,
    applyDelta: applyDelta
  };
};

var Rope = function (startElement) {

  var particles = [];
  var gravityVector = new Point(0, 0.9);
  var timeStep = 0.4;
  let crate = null;

  var update = function () {
    accumulateForces();
    verlet();
    satisfyConstraints();

    if (crate) {
      const lastParticle = getLastParticle();
      crate.setPosition(lastParticle.getX(), lastParticle.getY() - 15);
    }

  };

  function getLastParticle() {
    return particles[particles.length - 1];
  }

  var accumulateForces = function () {

    for (var i = 0; i < particles.length; i++) {
      var forcePoint = new Point(0, 0);
      forcePoint.add(gravityVector);
      particles[i].applyForce(forcePoint);
    }
  };

  var verlet = function () {
    for (var i = 0; i < particles.length; i++) {
      particles[i].verlet(timeStep);
    }
  };

  var satisfyConstraints = function () {
    for (var iterations = 0; iterations < 17; iterations++) {
      for (var i = 0; i < particles.length; i++) {
        particles[i].satisfyConstraints();
      }
    }
  };

  var render = function (canvas, context) {

    context.beginPath();

    context.strokeStyle = '#F0F000';
    context.lineWidth = 2;
    context.moveTo(particles[0].getX(), particles[0].getY());

    for (var i = 1; i < particles.length; i++) {
      context.lineTo(particles[i].getX(), particles[i].getY());
    }
    context.stroke();
    context.closePath();
  };

  function overlapsCrate(crate) {
    const overlapParticle = particles.find(p => {
      return crate.contains(p.getX(), p.getY());
    });

    return !!overlapParticle;
  }

  var initialize = function () {
    for (var i = 0; i < 15; i++) {
      particles[i] = Particle(i * 8 + startElement.getY(), startElement.getX());
      if (i == 0) {
        particles[i].addConstraint(new Constraint(startElement, 4));
      }
      else {
        particles[i].addConstraint(new Constraint(particles[i - 1], 8));
      }
    }
  };

  initialize();

  return {
    render: render,
    update: update,
    getRopeEndSpeed: () => {
      return getLastParticle().getLastSpeed();
    },
    hasCrate: () => {
      return !!crate;
    },
    setCrate: (newCrate) => {
      crate = newCrate;
      if(newCrate) {
        crate.setState(CRATE_STATE_ENUM.attached);
      }
    },
    overlapsCrate: overlapsCrate
  };
};

module.exports = Rope;