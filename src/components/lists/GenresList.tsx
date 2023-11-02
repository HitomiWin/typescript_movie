import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useGenresContext } from "../../contexts/GenreContext";
import { Genre } from "../../shared/type";
import styles from "../../css/Genres.module.scss";
import base from "../../css/Base.module.scss";
import Loader from "../Loader";

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  genreId: number;
}

const GenresList: FC<Props> = ({ setPage, genreId }) => {
  const navigate = useNavigate();
  const { getGenreName, genres, isLoading, isError, error } =
    useGenresContext();

  // when user click a button reset paget to 1
  const handleOnClick = (id: Genre["id"], name: Genre["name"]) => {
    setPage(1);
    getGenreName(name);
    navigate(`/genres/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    if (error instanceof Error) {
      return (
        <div className={base.error}>
          <h2 className={base.errorText}>
            {" "}
            Something went wrong. Please reload the page.
          </h2>
        </div>
      );
    }
  }

  return (
    <div className={styles.sidebarContainer}>
      <h3>Genres</h3>
      <hr />
      <ul className={styles.settingsPanel}>
        {genres?.genres.map((genre) => (
          <li
            className={`${genre.id === genreId && styles.current} list`}
            key={genre.id}
            onClick={() => handleOnClick(genre.id, genre.name)}
          >
            <span className={`${genre.id === genreId && styles.current} `}>
              {genre.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenresList;
