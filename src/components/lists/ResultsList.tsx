import React, { FC, useMemo } from "react";
import { People, Movies, IDataCategory } from "../../shared/type";
import styles from "../../css/Search.module.scss";

import { useNavigate, useParams } from "react-router-dom";

interface Props {
  readonly persons: Pick<People, "total_results"> | undefined;
  readonly movies: Pick<Movies, "total_results"> | undefined;
  readonly query: string | undefined;
  readonly page: number;
  readonly dataCategory: IDataCategory | null;
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
    [params, dataCategory, isDefault],
  );
  const handleOnClick = (name: string, disabled = true) => {
    if (disabled) {
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
              className={`${isCurrent ? styles.current : ""}list`}
              key={option.name}
            >
              <p
                onClick={() => handleOnClick(option.name, disabled)}
                className={`${isCurrent ? styles.current : ""}${
                  disabled ? styles.disabled : ""
                }`}
              >
                {option.name}
                <span
                  className={`${styles.totalNumber} ${
                    disabled ? styles.disabled : ""
                  }${isCurrent ? styles.current : ""}`}
                >
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
