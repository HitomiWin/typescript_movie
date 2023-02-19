import { FC } from "react";
import { People, Movies, IDataCategory } from "../../shared/type";
import styles from "../../css/Search.module.scss";
import { Link } from "react-router-dom";

interface Props {
  persons: People | undefined;
  movies: Movies | undefined;
  query: string | undefined;
  page: number;
}

const ResultsList: FC<Props> = ({ persons, movies, query, page }) => {
  const options = [
    { label: "Movies", name: IDataCategory.movies, value: movies },
    { label: "People", name: IDataCategory.people, value: persons },
  ];

  // const handleOnChange = (optionName: IDataCategory) => {};

  return (
    <div className={styles.resultsListContainer}>
      <h3>Search Results</h3>
      <div className={styles.settingsPanel}>
        {options.map((option) => {
          const disabled = !option.value || option.value.total_results < 1;
          return (
            <Link
              to={`${option.name}?query=${query}&page=${page}`}
              key={option.label}>
              <label
                className={`${styles.formControl} ${
                  disabled ? styles.disabled : ""
                }`}
                key={option.label}>
                <input
                  type="radio"
                  className={styles.checkBox}
                  name={option.name}
                  value={option.name}
                  disabled={disabled}
                />
                {option.label}
                <span
                  className={`${styles.totalNumber} ${
                    disabled ? styles.disabled : ""
                  }`}>
                  {option?.value?.total_results ?? 0}
                </span>
              </label>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default ResultsList;
