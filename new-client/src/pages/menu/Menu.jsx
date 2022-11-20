import './menu.css';
import MenuItem from "./components/menuItem/MenuItem";
import { useState, useEffect } from "react";

export default function Menu({
  menuItems,
  handleItemClicked,
}) {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItemTags = menuItems.map(
    (title, index) => <MenuItem key={title} title={title} selected={index === selectedIndex}/> );

  function handleKeyPress(event) {
    const key = event.key;
    if(key === 'ArrowUp') {
      setSelectedIndex(previousState => {
        const newIndex = previousState === 0 ? menuItemTags.length - 1 : previousState - 1;
        return newIndex;
      });
    } else if(key === 'ArrowDown') {
      setSelectedIndex(previousState => {
        const newIndex = (previousState + 1) % menuItemTags.length;
        return newIndex;
      });
    } else if(key === 'Enter') {
      console.log('Enter pressed', selectedIndex);
      handleItemClicked(menuItems[selectedIndex]);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });


  return (
    <ul className="menu">
      {menuItemTags}
    </ul>);
  
}

