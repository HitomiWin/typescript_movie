import React from "react";
import CategorizedMovies from "../components/CategorizedMovies";
import Hero from "../components/Hero";
import TrendignMovies from "../components/TrendignMovies";
import { ICategoryType, ICategoryTitle } from "../shared/type";

const Home = () => {
  return (
    <section>
      <Hero />
      <TrendignMovies />
      <CategorizedMovies
        type={ICategoryType.popular}
        title={ICategoryTitle.popular}
      />
      <CategorizedMovies
        type={ICategoryType.now_playing}
        title={ICategoryTitle.now_playing}
      />
      <CategorizedMovies
        type={ICategoryType.top_rated}
        title={ICategoryTitle.top_rated}
      />
    </section>
  );
};

export default Home;
