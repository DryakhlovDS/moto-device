import "./nav.scss";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { BasketContext } from "../../store/BasketStore";
import { observer } from "mobx-react-lite";

const Nav = observer(() => {
  let { pathname } = useLocation();
  const { basket } = useContext(BasketContext);
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
          {!!basket.allDevices.length && basket.allDevices.length}
        </Link>
      </li>
    </ul>
  );
});

export default Nav;
