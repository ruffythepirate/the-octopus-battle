
export enum GameEventType {
  PLAYER_HIT = 0,
  ASTROID_SPAWNED = 1,
  PLAYER_ACTION = 2,
  PLAYER_CONTROLS = 4,
  PICK_UP_ASTROID = 3,
}

export enum PlayerAction {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
  SHOOT = 4,
}

export abstract class GameEventDto {
    public readonly type: GameEventType;
    public readonly iteration: number | undefined;

    constructor(type: GameEventType, iteration: number | undefined) {
        this.type = type;
        this.iteration = iteration;
    }
}

export class PlayerHitEventDto extends GameEventDto {
    public readonly playerId: number;
    public readonly astroidId: number;

    constructor(playerId: number, astroidId: number, iteration: number) {
        super(GameEventType.PLAYER_HIT, iteration);
        this.playerId = playerId;
        this.astroidId = astroidId;
    }
}

export class AstroidSpawnedEventDto extends GameEventDto {
    public readonly astroidId: number;
    public readonly x: number;
    public readonly y: number;

    constructor(astroidId: number, x: number, y: number, iteration: number | undefined = undefined) {
        super(GameEventType.ASTROID_SPAWNED, iteration);
        this.astroidId = astroidId;
        this.x = x;
        this.y = y;
    }
}

export class PlayerControlsEventDto extends GameEventDto {
    public readonly playerId: number;
    public readonly action: PlayerAction;
    public readonly pressed: boolean;

    constructor(playerId: number, action: PlayerAction, pressed: boolean) {
        super(GameEventType.PLAYER_ACTION, undefined);
        this.playerId = playerId;
        this.action = action;
        this.pressed = pressed;
    }
}

export class PickUpAstroidEventDto extends GameEventDto {
  public readonly playerId: number;
  public readonly astroidId: number;

  constructor(playerId: number, astroidId: number, iteration: number) {
    super(GameEventType.PICK_UP_ASTROID, iteration);
    this.playerId = playerId;
    this.astroidId = astroidId;
  }
}
