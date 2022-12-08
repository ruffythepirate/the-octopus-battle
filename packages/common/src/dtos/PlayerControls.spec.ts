import {PlayerControls} from "./PlayerControls";

describe('PlayerControls', () => {

  it('should initialize with neutral controls', () => {
    const playerControls = new PlayerControls();
    expect(playerControls.left).toBeFalsy();
    expect(playerControls.right).toBeFalsy();
    expect(playerControls.up).toBeFalsy();
    expect(playerControls.down).toBeFalsy();
  });
});
