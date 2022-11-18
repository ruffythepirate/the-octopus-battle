import './App.css';
import Credits from './pages/credits/Credits';
import Menu from './pages/menu/Menu';
import { useState} from "react";

function App() {
  const [selectedPage, setSelectedPage] = useState('Menu');

  function getSelectedPage(selectedPage) {
    switch (selectedPage) {
      case 'Credits':
        return <Credits handleExit={handleExit} />;
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
