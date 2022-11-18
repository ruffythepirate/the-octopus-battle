
export default function Practice() {

  useeffect(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
  }, []);

return (<div id="overlay" class="fullSize">
      <canvas id='game-canvas' class="fullSize"></canvas>
  </div>);
}
