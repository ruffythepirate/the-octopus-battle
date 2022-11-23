import './menu.css';
import MenuItem from "../menuItem/MenuItem";
import { useState, useEffect } from "react";

export default function Menu() {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = ["Practice", "2 Players", "Instuctions", "Credits"].map(
    (title, index) => <MenuItem key={title} title={title} selected={index === selectedIndex}/> );

  function handleKeyPress(event) {
    const key = event.key;
    console.log('key pressed: ' + key);
    if(key === 'ArrowUp') {
      setSelectedIndex(previousState => {
        const newIndex = previousState === 0 ? menuItems.length - 1 : previousState - 1;
        return newIndex;
      });
    } else if(key === 'ArrowDown') {
      setSelectedIndex(previousState => {
        const newIndex = (previousState + 1) % menuItems.length;
        return newIndex;
      });
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);



  return (
    <ul className="menu">
      {menuItems}
    </ul>);
  
}
