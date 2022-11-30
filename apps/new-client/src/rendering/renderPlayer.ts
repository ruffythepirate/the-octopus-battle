import { PlayerDto } from "@the-octopus-battle/common/build";
import { getImage } from "./imageService";

export function renderPlayer(ctx: CanvasRenderingContext2D, player: PlayerDto) {
   const image = getImage(player.color, (color) => `resources/${color}_small.jpeg`);

   console.log('image', image);
   if (image) {
     ctx.drawImage(image, player.x, player.y);
   }
}

