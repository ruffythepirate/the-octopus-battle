import {PlayerAction, PlayerControlsEventDto} from "../logic/events/GameEventDto";

export class PlayerControls {
    readonly left: boolean = false;
    readonly right: boolean = false;
    readonly up: boolean = false;
    readonly down: boolean = false;
    readonly fire: boolean = false;

    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.fire = false;
    }
}

export function applyControlEvent(playerControls: PlayerControls, event: PlayerControlsEventDto): PlayerControls {
    return {...playerControls, [getPropertyName(event.action)]: event.pressed} as PlayerControls;
}

function getPropertyName(action: PlayerAction) {
    switch (action) {
        case PlayerAction.LEFT:
            return 'left';
        case PlayerAction.RIGHT:
            return 'right';
        case PlayerAction.UP:
            return 'up';
        case PlayerAction.DOWN:
            return 'down';
        case PlayerAction.SHOOT:
            return 'fire';
        default:
            throw new Error('Unknown action: ' + action);
    }
}
