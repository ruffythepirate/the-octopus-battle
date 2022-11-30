import { PlayerDto } from "@the-octopus-battle/common/build";
import { getImage } from "./imageService";

import playerColors from "../common/consts/playerColors";

export function renderPlayer(ctx: CanvasRenderingContext2D, player: PlayerDto) {
   const image = getImage(player.color, (color) => `resources/${color}_small.jpeg`);
   if (image) {
     ctx.drawImage(image, player.x, player.y, player.w, player.h);
   } else {
      const color = playerColors[player.color];
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(player.getX(),player.getY(),player.w /2,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
   }
}

