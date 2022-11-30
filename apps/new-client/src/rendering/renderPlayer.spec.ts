import { PlayerDto } from '@the-octopus-battle/common';
import { renderPlayer } from './renderPlayer';

import { getImage } from './imageService';
const image = 'image';
jest.mock('./imageService', () => ({
  __esModule: true,
  getImage: () => image
}));

describe('renderPlayer', () => {
  let player: PlayerDto;

  const context: CanvasRenderingContext2D = {
    drawImage: jest.fn()
  } as any;

  beforeEach(() => {
    jest.resetModules();
    player = new PlayerDto(0);
  });

  describe('when image exists', () => {
    it('should render the player with image', () => {
      // Arrange

      // Act
      const result = renderPlayer(context, player);

      // Assert
      expect(context.drawImage).toHaveBeenCalled();
    });
  });

  describe('when image does not exist', () => {
    // it('should render the player with color', () => {
    //   const player = new Player('blue', 0, 0);
    //   const canvas = document.createElement('canvas');
    //   const context = canvas.getContext('2d');
    //   renderPlayer(context, player);
    //   expect(context).toMatchSnapshot();
    // });
  });
});
