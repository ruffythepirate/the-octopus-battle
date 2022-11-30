import { GameStateDto } from '@the-octopus-battle/common';


export class GameRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
  }

  public render(gameState: GameStateDto): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
