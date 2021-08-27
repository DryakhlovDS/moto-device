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
      <li className={pathname === "/about" ? "nav__active" : ""}>
        <Link to='/about'>О проекте</Link>
      </li>
      <li className={pathname === "/contacts" ? "nav__active" : ""}>
        <Link to='/contacts'>Контакты</Link>
      </li>
      <li className={pathname === "/pay" ? "nav__active" : ""}>
        <Link to='/pay'>Оплата/доставка</Link>
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
