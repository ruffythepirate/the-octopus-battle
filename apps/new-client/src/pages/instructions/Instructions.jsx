import './instructions.css';
import { useEffect } from "react";

export default function Instructions({handleExit}) {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  function handleKeyPress(event) {
    handleExit();
  }
  return (
    <div className="instructions">
      <h1>Instructions</h1>
      <p>
        This is a simple simulation of what would happen if octopuses were given too much time and would live in space rather than water.</p>
      <h2>Controls</h2>
      <p>
          First octopus moves using arrow keys and releases his astroid using spacebar.</p> 
        <p> Second octopus moves using WASD and releases his astroid using F.
      </p>
      <p>
        Pick up astroids, swing them and throw them at your opponent. Have fun. Go in octopus battle.
      </p>
    </div>
  );
}
