import { FC, Dispatch } from "react";
import { Movies, People, Movie, Cast } from "../../shared/type";
import MovieCard from "../cards/MovieCard";
import PersonCard from "../cards/PersonCard";
import styles from "../../css/SearchList.module.scss";
import PaginationButtons from "../../components/buttons/PagenationButtons";

interface Props {
  data: People | Movies | undefined;
  defaultPage: number;
  type: string;
}

const SearchList: FC<Props> = ({ data, type, defaultPage }) => {
  console.log({ type, data });
  if (!data || !type) {
    return (
      <>
        <p> No result match your search. Try again</p>
      </>
    );
  }
  if (type === "movies") {
    return (
      <div className={styles.searchListContainer}>
        <div className={styles.searchListWrapper}>
          {data.results.map((data) => (
            <MovieCard key={data.id} movie={data as Movie} />
          ))}
        </div>
      </div>
    );
  }
  if (type === "persons") {
    return (
      <div className={styles.searchListContainer}>
        <div className={styles.searchListWrapper}>
          {data.results.map((data) => (
            <PersonCard key={data.id} person={data as Cast} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <p> No result match your search. Try again</p>
    </>
  );
};

export default SearchList;
