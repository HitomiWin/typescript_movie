import styles from "../../css/Navbar.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} wContainer`}>
        <div className={styles.site}>
          <Link to="/">
            <div className={styles.logo}>
              <span>Movie</span>
            </div>
          </Link>
        </div>
        <button className={styles.navbtn}>
          <FontAwesomeIcon icon={faBars} />
          <span className="sr-only">Menu</span>
        </button>
      </div>
    </header>
  );
};

export default Navigation;
