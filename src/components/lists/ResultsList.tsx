import { FC } from "react";
import { People, Movies } from "../../shared/type";
import styles from "../../css/Search.module.scss";

interface Props {
  persons: People | undefined;
  movies: Movies | undefined;
}
const ResultsList: FC<Props> = ({ persons, movies }) => {
  return (
    <div className={styles.resultsListContainer}>
      <h3>Search Results</h3>
      <ul className={styles.settingsPanel}>
        <li>
          Movies <span> {movies?.total_results ?? 0} </span>
        </li>
        <li>
          People <span>{persons?.total_results}</span>
        </li>
      </ul>
    </div>
  );
};
export default ResultsList;
