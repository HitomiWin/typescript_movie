import MovieCard from "../cards/MovieCard";
import { FC } from "react";
import { Movies } from "../../shared/type";
import styles from "../../css/CardList.module.scss";

interface Props {
  data: Movies;
}
const MovieCardList: FC<Props> = ({ data }) => {
  return (
    <div className={`${styles.listContainer} wContainer`}>
      {data?.results?.map((result, i) => (
        <MovieCard movie={result} key={i} />
      ))}
    </div>
  );
};

export default MovieCardList;
