const GAME_CONSTANTS = {
  g: 0.08,        //gravity acceleration
  vFriction: 0.99,    //vertical friction factor
  hFriction: 0.99,  //horizontal friction factor
  vAcceleration: 0.7, //vertical acceleration
  hAcceleration: 0.7, //horizontal acceleration

  hStabilize: 0.1,  // when |speed| below this it becomes zero.

  letterSpawnFrequency: 3,
  playerRespawnTime: 5,
  damagePerHit: 20
};

module.exports = GAME_CONSTANTS;