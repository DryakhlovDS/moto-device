import "./nav.scss";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { GoodsContext } from "../../store/store";

function Nav() {
  let { pathname } = useLocation();
  const [goods] = useContext(GoodsContext);
  return (
    <ul className='nav'>
      <li className={pathname === "/" ? "nav__active" : ""}>
        <Link to='/'>Главная</Link>
      </li>
      <li className={pathname === "/device" ? "nav__active" : ""}>
        <Link to='/device'>Устройства</Link>
      </li>
      <li className={pathname === "/shop" ? "nav__active" : ""}>
        <Link to='/shop'>Магазин</Link>
      </li>
      <li className={pathname === "/basket" ? "nav__active" : ""}>
        <Link to='/basket'>
          <ShoppingCartIcon />
          {!!goods.length && goods.length}
        </Link>
      </li>
    </ul>
  );
}

export default Nav;
