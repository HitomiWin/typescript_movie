import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Hero.module.scss";

import SearchForm from "./forms/SearchForm";
const Hero = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchRef?.current?.value) {
      return;
    }
    navigate(`/search?query=${searchRef.current.value}`);
  };

  return (
    <section className={styles.hero}>
      <div className={`${styles.heroContainer} wContainer`}>
        <h1>Movies change your life</h1>
        <p>Millions of movies and people to discover. Explore now.</p>
        <div className={styles.searchContainer}>
          <SearchForm handleSubmit={handleSubmit} searchRef={searchRef} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
