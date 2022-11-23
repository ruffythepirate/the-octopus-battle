import './category.css';

import Contributor from '../contributor/Contributor';

export default function Category({
  title,
  contributors
}) {


  const contributorDivs = contributors.map( (contributor, index) => <Contributor key={index} name={contributor.name} role={contributor.role}/> );


  return (
    <div className="category">
      <h2>{title}</h2>
      {contributorDivs}
    </div>
  );
}
