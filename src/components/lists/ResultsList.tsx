import { FC } from "react";
import { People, Movies, IDataCategory } from "../../shared/type";
import styles from "../../css/Search.module.scss";

interface Props {
  persons: People | undefined;
  movies: Movies | undefined;
  dataCategory: IDataCategory | null;
  setDataCategory: React.Dispatch<React.SetStateAction<IDataCategory | null>>;
}

const ResultsList: FC<Props> = ({
  persons,
  movies,
  dataCategory,
  setDataCategory,
}) => {
  const options = [
    { label: "Movies", name: IDataCategory.movies, value: movies },
    { label: "People", name: IDataCategory.people, value: persons },
  ];

  const handleOnChange = (optionName: IDataCategory) => {
    setDataCategory(optionName);
  };

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
                checked={option.name === dataCategory}
                value={option.name}
                disabled={disabled}
                onChange={() => handleOnChange(option.name)}
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
