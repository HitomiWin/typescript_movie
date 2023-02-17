import { FC } from "react";
import { People, Movies } from "../../shared/type";
import styles from "../../css/Search.module.scss";

interface Props {
  persons: People | undefined;
  movies: Movies | undefined;
  checkedValue: People | Movies | undefined;
  onChangeAttribute: (value: People | Movies | undefined) => void;
}

const ResultsList: FC<Props> = ({
  persons,
  movies,
  checkedValue,
  onChangeAttribute,
}) => {
  const options = [
    { label: "Movies", name: "movies", value: movies },
    { label: "People", name: "people", value: persons },
  ];
  return (
    <div className={styles.resultsListContainer}>
      <h3>Search Results</h3>
      <div className={styles.settingsPanel}>
        {options.map((option) => {
          const disabled = !option.value || option.value.total_results < 1;
          return (
            <label
              className={`${styles.formControl} ${
                disabled ? styles.disabled : ""
              }`}
              key={option.label}>
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
          );
        })}
      </div>
    </div>
  );
};
export default ResultsList;
