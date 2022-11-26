export class PlayerCallbacks {
    readonly playerId: number;
    readonly eventCallback: () => void;

  constructor(playerId: number, eventCallback: () => void) {
    this.playerId = playerId;
    this.eventCallback = eventCallback;
  }
}
