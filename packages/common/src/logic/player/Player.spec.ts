import {PlayerAction, PlayerControls, PlayerControlsEventDto} from "../../dtos";
import {Player} from "./Player";

describe('Player', () => {

  let player: Player;

  beforeEach(() => {
    player = new Player(1);
  });

  it('should initialize with neutral controls', () => {
    expect(player.playerControls).toEqual(new PlayerControls());
  });

  ['left', 'right', 'up', 'down'].forEach(action => {
    it(`should update controls when ${action} is pressed`, () => {
      const event = new PlayerControlsEventDto(1, PlayerAction[action.toUpperCase()], true);
      player.applyControlEvent(event);
      expect(player.playerControls[action]).toBeTruthy();
    });
  });
});


