import React, { useLayoutEffect } from "react";
import styles from "../../css/Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
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
  useLayoutEffect(() => {
    if (showMenu) {
      document.querySelector("html")?.classList.add("open");
    }
    if (!showMenu) {
      document.querySelector("html")?.classList.remove("open");
    }
  }, [showMenu]);

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
          onClick={handleNavButton}
        >
          <FontAwesomeIcon className={styles.faBars} icon={faBars} />
          <FontAwesomeIcon className={styles.faTimes} icon={faTimes} />
          <span className="sr-only">Menu</span>
        </button>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink
                to="/"
                onClick={() => hideMenu()}
                className={styles.menuItem}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/genres/${genreId}`}
                onClick={() => hideMenu()}
                className={styles.menuItem}
              >
                Genre
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/search"}
                onClick={() => hideMenu()}
                className={styles.menuItem}
              >
                <FontAwesomeIcon
                  className={styles.fas}
                  size="lg"
                  icon={faSearch}
                />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
