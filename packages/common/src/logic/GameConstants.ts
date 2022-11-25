export interface GameConstants {
  g: number,        //gravity acceleration
  vFriction: number,    //vertical friction factor
  hFriction: number,  //horizontal friction factor
  vAcceleration: number, //vertical acceleration
  hAcceleration: number, //horizontal acceleration
  hStabilize: number,  // when |speed| below this it becomes zero.
  playerRespawnTime: number,
  damagePerHit: number
}

export const gameConstants = {
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

