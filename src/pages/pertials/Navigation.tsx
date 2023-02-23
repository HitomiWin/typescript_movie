import styles from "../../css/Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavbarContext } from "../../contexts/NavBarContext";
import { useGenresContext } from "../../contexts/GenreContext";

const Navigation = () => {
  const { showMenu, setShowMenu } = useNavbarContext();
  const { genreId } = useGenresContext();
  const handleNavButton = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.headerContainer} wContainer`}>
        <div className={styles.site}>
          <Link to="/">
            <div className={styles.logo}>
              <span>Movie</span>
            </div>
          </Link>
        </div>
        <button
          className={`${styles.navbtn} ${showMenu && styles.showMenu}`}
          onClick={handleNavButton}>
          <FontAwesomeIcon className={styles.faBars} icon={faBars} />
          <FontAwesomeIcon className={styles.faTimes} icon={faTimes} />
          <span className="sr-only">Menu</span>
        </button>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink to="/" onClick={() => hideMenu()}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={`/genres/${genreId}`} onClick={() => hideMenu()}>
                Genre
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
