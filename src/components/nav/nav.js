import "./nav.scss";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Nav() {
  return (
    <ul className='nav'>
      <li>
        <Link to='/'>Главная</Link>
      </li>
      <li>
        <Link to='/device'>Устройства</Link>
      </li>
      <li>
        <Link to='/shop'>Магазин</Link>
      </li>
      <li>
        <Link to='/basket'>
          <ShoppingCartIcon />
        </Link>
      </li>
    </ul>
  );
}

export default Nav;
