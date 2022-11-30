import { PlayerDto } from '@the-octopus-battle/common';
import { renderPlayer } from './renderPlayer';
import { getImage } from './imageService';

jest.mock('./imageService', () => ({
//  __esModule: true,
  getImage: jest.fn(),
}));

describe('renderPlayer', () => {
  let player: PlayerDto;

  const context: CanvasRenderingContext2D = {
    drawImage: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    closePath: jest.fn(),
    fill: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.resetModules();
    player = new PlayerDto(0);
  });

  describe('when image exists', () => {
    it('should render the player with image', () => {
      (getImage as jest.Mock).mockReturnValue('image');
      const result = renderPlayer(context, player);

      expect(context.drawImage).toHaveBeenCalledWith('image', 
                                                     player.x, 
                                                     player.y,
                                                    player.w, player.h);
    });
  });

  describe('when image does not exist', () => {
    it('should render the player with color', () => {
      (getImage as jest.Mock).mockReturnValue(null);
       const player = new PlayerDto(0);
       renderPlayer(context, player);
       expect(context.arc).toHaveBeenCalled();
     });
  });
});
