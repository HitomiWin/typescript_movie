import styles from "../css/Hero.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContainer} wContainer`}>
        <h1>Movies changes your life</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
        <div className={styles.searchContainer}>
          <form className={styles.form}>
            <input
              type="search"
              placeholder="Search for a movie, person..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn}>
              <FontAwesomeIcon className={styles.fas} icon={faSearch} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
