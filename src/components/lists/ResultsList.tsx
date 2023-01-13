import { FC } from "react";
import { People, Movies } from "../../shared/type";
import styles from "../../css/Search.module.scss";
import { Link } from "react-router-dom";

interface Props {
  persons: People | undefined;
  movies: Movies | undefined;
  checkedValue: People | Movies | undefined;
  onChangeAttribute: (value: People | Movies | undefined) => void;
  query: string | undefined;
}

const ResultsList: FC<Props> = ({
  persons,
  movies,
  checkedValue,
  onChangeAttribute,
  query,
}) => {
  const options = [
    { label: "Movies", name: "movies", value: movies },
    { label: "People", name: "persons", value: persons },
  ];
  console.log(checkedValue);
  return (
    <div className={styles.resultsListContainer}>
      <h3>Search Results</h3>
      <nav className={styles.settingsPanel}>
        {options.map((option) => {
          const disabled = !option.value || option.value.total_results < 1;
          return (
            <Link to={`${option.name}?query=${query}`} key={option.label}>
              <label
                className={`${styles.formControl} ${
                  disabled ? styles.disabled : ""
                }`}>
                <input
                  type="radio"
                  className={styles.checkBox}
                  name={option.name}
                  checked={checkedValue === option.value}
                  onChange={() => onChangeAttribute(option.value)}
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
      </nav>
    </div>
  );
};
export default ResultsList;
