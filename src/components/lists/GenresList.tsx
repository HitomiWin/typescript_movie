import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { useGenresContext } from "../../contexts/GenreContext";
import { Genre } from "../../shared/type";
import setting from "../../css/Search.module.scss";

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  genreId: number | number;
}

const GenresList: FC<Props> = ({ setPage, genreId }) => {
  const navigate = useNavigate();
  const { getGenreName, genres, isLoading, isError, error } =
    useGenresContext();

  // when user click a button reset paget to 1
  const handleOnChange = (id: Genre["id"], name: Genre["name"]) => {
    setPage(1);
    getGenreName(name);
    navigate(`/genres/${id}`);
  };
  if (isLoading) {
    <FadeLoader />;
  }
  return (
    <div className={setting.resultsListContainer}>
      <h3>Genres</h3>
      <div className={setting.settingsPanel}>
        {genres?.genres.map((genre) => (
          <label className={`${setting.formControl} `} key={genre.id}>
            <input
              type="radio"
              className={setting.checkBox}
              name={genre.name}
              value={genre.id}
              checked={genre.id === genreId}
              onChange={() => handleOnChange(genre.id, genre.name)}
            />
            {genre.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenresList;
