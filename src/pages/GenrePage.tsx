import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMoviesByGenre } from "../services/tmdbApi";
import { useUrlSearchParams } from "use-url-search-params";
import { FadeLoader } from "react-spinners";
import GenresList from "../components/lists/GenresList";
import MovieList from "../components/lists/MovieList";
import setting from "../css/Search.module.scss";

const GenrePage = () => {
  const { genre_id } = useParams();
  const [params, setParams] = useUrlSearchParams({ page: 1 }, { page: Number });
  const [page, setPage] = useState<number>((params.page = 1));

  const { data, isLoading, isError, error, isPreviousData } = useQuery(
    ["movies-genre", genre_id, params.page],
    () => getMoviesByGenre(parseInt(genre_id ?? ""), params.page as number),
    {
      keepPreviousData: true,
    }
  );
  useEffect(() => {
    setParams({ ...params, page });
    // eslint-disable-next-line
  }, [genre_id, page]);

  if (isLoading) {
    <FadeLoader />;
  }
  return (
    <div className={`${setting.contentWrapper} wContainer`}>
      <div>
        <GenresList setPage={setPage} genreId={parseInt(genre_id ?? "")} />
      </div>
      {data ? (
        <MovieList
          movies={data}
          isPreviousMoviesData={isPreviousData}
          page={page}
          setPage={setPage}
          paramsPage={params.page as number}
        />
      ) : null}
    </div>
  );
};
export default GenrePage;
