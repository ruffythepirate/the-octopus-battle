import {PlayerAction, PlayerControlsEventDto} from "../logic/events/GameEventDto";

export class PlayerControls {
    left: boolean = false;
    right: boolean = false;
    up: boolean = false;
    down: boolean = false;

    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
    }

    applyEvent(event: PlayerControlsEventDto) {
        switch (event.action) {
            case PlayerAction.LEFT:
                this.left = event.pressed;
                break;
            case PlayerAction.RIGHT:
                this.right = event.pressed;
                break;
            case PlayerAction.UP:
                this.up = event.pressed;
                break;
            case PlayerAction.DOWN:
                this.down = event.pressed;
                break;
        }
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
