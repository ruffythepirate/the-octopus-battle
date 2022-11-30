
const playerImages: Map<String, HTMLImageElement | null> = new Map();

export function getImage(color: string, pathFn: (path: string)=>string): HTMLImageElement | null {
    if (playerImages.has(color)) {
      return playerImages.get(color);
    }
    playerImages.set(color, loadPlayerImage(pathFn(color)));
    return playerImages.get(color);
}

function loadPlayerImage(color: string): HTMLImageElement | null {
  try {
    const image = new Image();
    image.src = `resources/${color}_small.png`;
    return image;
  } catch (e) {
    console.error(e);
    return null;
  }
}
