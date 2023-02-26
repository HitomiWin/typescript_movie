import { FC, useMemo } from "react";
import { People, Movies, IDataCategory } from "../../shared/type";
import styles from "../../css/Search.module.scss";

import { useNavigate, useParams } from "react-router-dom";

interface Props {
  persons: People | undefined;
  movies: Movies | undefined;
  query: string | undefined;
  page: number;
  dataCategory: IDataCategory | null;
}

const ResultsList: FC<Props> = ({
  persons,
  movies,
  query,
  page,
  dataCategory,
}) => {
  const navigate = useNavigate();
  const options = [
    { label: "Movies", name: IDataCategory.movies, value: movies },
    { label: "People", name: IDataCategory.people, value: persons },
  ];

  const params = useParams();
  const isDefault = Object(params)["*"] === "";
  const current = useMemo(
    () => (isDefault ? dataCategory : Object(params)["*"]),
    [params, dataCategory, isDefault]
  );
  const handleOnClick = (name: string, diabled = true) => {
    if (diabled) {
      return;
    }
    navigate(`${name}?query=${query}&page=${page}`);
  };

  return (
    <div className={styles.sidebarContainer}>
      <h3>Search Results</h3>
      <hr />
      <ul className={styles.settingsPanel}>
        {options.map((option) => {
          const disabled = !option.value || option.value.total_results < 1;
          const isCurrent = current === option.name;
          return (
            <li
              className={`${isCurrent && styles.current} list`}
              key={option.name}>
              <p
                onClick={() => handleOnClick(option.name, disabled)}
                className={`${isCurrent ? styles.current : ""} ${
                  disabled ? styles.disabled : ""
                }`}>
                {option.name}
                <span
                  className={`${styles.totalNumber} ${
                    disabled ? styles.disabled : ""
                  }${isCurrent && styles.current}`}>
                  {option?.value?.total_results ?? 0}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ResultsList;
