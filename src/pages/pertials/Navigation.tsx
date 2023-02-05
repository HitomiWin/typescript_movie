import styles from "../../css/Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavbarContext } from "../../contexts/NavBarContext";

const Navigation = () => {
  const { showMenu, setShowMenu } = useNavbarContext();
  const handleNavButton = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={`${styles.header} ${showMenu && styles.open}`}>
      <div className={`${styles.headerContainer} wContainer`}>
        <div className={styles.site}>
          <Link to="/">
            <div className={styles.logo}>
              <span>Movie</span>
            </div>
          </Link>
        </div>
        <button
          className={`${styles.navbtn} ${showMenu && styles.open}`}
          onClick={handleNavButton}>
          <FontAwesomeIcon icon={faBars} />
          <span className="sr-only">Menu</span>
        </button>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/genre">Genre</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
