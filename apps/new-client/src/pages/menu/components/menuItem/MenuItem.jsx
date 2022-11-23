import './menuItem.css'

export default function MenuItem( { title, selected }) {
  return (
    <li className={selected ? "menu-item-selected" : ""}>{title}</li>
  )
}

