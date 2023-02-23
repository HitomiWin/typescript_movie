import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Cast } from "../../shared/type";
import styles from "../../css/CardList.module.scss";

interface Props {
  readonly person: Cast;
}

const PersonCard: FC<Props> = ({ person }) => {
  const navigate = useNavigate();
  const posterUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
    : null;

  const handleOnClick = () => {
    navigate(`/person/${person.id}`);
  };

  return (
    <>
      <article className={styles.card} onClick={handleOnClick}>
        <figure>
          {posterUrl ? (
            <img src={posterUrl} alt="" width="200" />
          ) : (
            <div className={styles.noImageContainer}>
              <p> No Image</p>
            </div>
          )}
        </figure>
        <div className={styles.titleContainer}>
          <h3>{person.name}</h3>
        </div>
      </article>
    </>
  );
};

export default PersonCard;
