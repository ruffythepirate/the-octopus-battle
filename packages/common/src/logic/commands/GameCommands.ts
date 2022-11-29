
export enum GameCommandType {
    SPAWN_ASTROID,
    SPAWN_PLAYER,
    UPDATE_CONTROLS
}

export abstract class GameCommand {
    public readonly type: GameCommandType;

    constructor(type: GameCommandType) {
        this.type = type;
    }
}

export class SpawnAstroid extends GameCommand {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        super(GameCommandType.SPAWN_ASTROID);
        this.x = x;
        this.y = y;
    } 
}
