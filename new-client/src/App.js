import './App.css';
import Credits from './pages/credits/Credits';
import Menu from './pages/menu/Menu';
import Practice from './pages/practice/Practice';
import { useState, useEffect } from "react";
import SplitScreen from './pages/splitScreen/SplitScreen';
import Instructions from './pages/instructions/Instructions';

function App() {
  const [selectedPage, setSelectedPage] = useState('Menu');

  function getSelectedPage(selectedPage) {
    switch (selectedPage) {
      case 'Credits':
        return <Credits handleExit={handleExit} />;
      case 'Practice':
        return <Practice handleExit={handleExit} />;
      case '2 Players':
        return <SplitScreen handleExit={handleExit} />;
      case 'Join Online':
        return <SplitScreen handleExit={handleExit} />;
      case 'Instructions':
        return <Instructions handleExit={handleExit} />;
      default:
        const menuItems = ["Practice", "2 Players", "Join Online", "Instructions", "Credits"];
        return <Menu menuItems={menuItems} handleItemClicked={handleItemClicked} />;
    }
  }

  function handleExit() {
    setSelectedPage('Menu');
  }

  function handleItemClicked(item) {
    console.log('item clicked', item);
    setSelectedPage(item);
  }

  const selectedPageComponent = getSelectedPage(selectedPage);

  useEffect(() => {
    document.getElementById('music').play();
  });

  return (
    <div className="App">
      <audio id="music" src="resources/CosmicSnailsDancing.mp3" loop autoPlay type="audio/mpeg"></audio>
      <header className="App-header">
        {selectedPageComponent}
      </header>
    </div>
  );
}


export default App;
