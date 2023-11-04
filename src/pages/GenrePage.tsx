import React, { useEffect, useState, FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMoviesByGenre } from "../services/tmdbApi";
import { useUrlSearchParams } from "use-url-search-params";
import GenresList from "../components/lists/GenresList";
import MovieList from "../components/lists/MovieList";
import styles from "../css/Genres.module.scss";
import base from "../css/Base.module.scss";
import Loader from "../components/Loader";

const GenrePage: FC = () => {
  const { genre_id } = useParams();
  const [params, setParams] = useUrlSearchParams({ page: 1 }, { page: Number });
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, error, isPreviousData } = useQuery(
    ["movies-genre", genre_id, params.page],
    () => getMoviesByGenre(parseInt(genre_id ?? ""), params.page as number),
    {
      keepPreviousData: true,
    },
  );
  useEffect(() => {
    setParams({ ...params, page });
    Element.prototype.scrollTo = () => {};
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
    // eslint-disable-next-line
  }, [genre_id, page]);

  useEffect(() => {
    setPage(1);
  }, [genre_id]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    if (error instanceof Error) {
      return (
        <div className={base.error}>
          <h2 className={base.errorText}>
            Something went wrong. Please reload the page.
          </h2>
        </div>
      );
    }
  }
  return (
    <div className={`${styles.contentWrapper} wContainer`}>
      <GenresList setPage={setPage} genreId={parseInt(genre_id ?? "")} />
      {data ? (
        <MovieList
          movies={data}
          isPreviousMoviesData={isPreviousData}
          page={page}
          setPage={setPage}
          paramsPage={params.page as number}
          genreId={genre_id}
        />
      ) : null}
    </div>
  );
};
export default GenrePage;
