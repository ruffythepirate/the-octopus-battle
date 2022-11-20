export function playMusic() {
  try {
    const audio = new Audio('./resources/CosmicSnailDancing.mp3');
    audio.loop = true;
    audio.load();
    audio.play();
    return () => {
      //audio.pause();
    }
  } catch (e) {
    console.log(e);
  }
  return () => {};
}
