import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovieDetails } from "../services";
import home from "../css/Home.module.scss";
import MovieDetails from "../components/MovieDetails";
import PersonCardList from "../components/lists/PersonCardList";
import Loader from "../components/Loader";

const MovieDetailsPage = () => {
  const { movie_id } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    ["movie", movie_id],
    () => getMovieDetails(Number(movie_id)),
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    if (error instanceof Error) {
      return (
        <div className={home.error}>
          <h2 className={home.errorText}>
            Something went wrong. Please reload the page.
          </h2>
        </div>
      );
    }
  }

  return (
    <>
      <section>{data ? <MovieDetails movie={data} /> : null}</section>
      <section>
        {data ? <PersonCardList casts={data.credits.cast} /> : null}
      </section>
    </>
  );
};

export default MovieDetailsPage;
