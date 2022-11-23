import './credits.css';
import Category from './components/category/Category';

import { useEffect } from "react";

export default function Credits({handleExit}) {


  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  function handleKeyPress(event) {
    handleExit();
  }

  const contributorsPerCategory = {
    Programming: [
      {
        name: "Johan Ablett-Karlsson",
        role: "Main Developer"
      }
    ],
    Music: [
      {
        name: "Marcus Ekstrand",
        role: "Main Composer"
      }
    ],
    Thanks: [
      {
        name: "Seyda Bora Benzer",
        role: "Assisting Game Design"
      }
    ]
  }

  const categories = ["Programming", "Music", "Thanks"].map( (title, index) => <Category key={title} title={title} contributors={contributorsPerCategory[title]}/> );

  return (
    <div className="credits">
      <h1>Credits</h1>
      {categories}
    </div>);
}
