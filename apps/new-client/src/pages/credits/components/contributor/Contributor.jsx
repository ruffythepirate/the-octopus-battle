import './contributor.css';

export default function Contributor({
  name,
  role
}) {
  return (
    <div className="contributor">
      <div className="contributor-role">
        {role}
      </div>
      <div className="contributor-name">
        {name}
      </div>
    </div>
  );
}
