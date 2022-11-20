import './App.css';
import Credits from './pages/credits/Credits';
import Menu from './pages/menu/Menu';
import Practice from './pages/practice/Practice';
import { useState} from "react";
import SplitScreen from './pages/splitScreen/SplitScreen';

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
      default:
        const menuItems = ["Practice", "2 Players", "Instuctions", "Credits"];
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


  return (
    <div className="App">
      <header className="App-header">
        {selectedPageComponent}
      </header>
    </div>
  );
}


export default App;
