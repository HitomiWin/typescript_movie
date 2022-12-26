import { FC } from "react";
import { Cast } from "../../shared/type";
import styles from "../../css/CardList.module.scss";

interface Props {
  readonly person: Cast;
}

const PersonCard: FC<Props> = ({ person }) => {
  const posterUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
    : "../../images/no-image-icon-23485.png";

  const handleOnClick = () => {
    // navigate(`/movie/${movie.id}`);
  };

  return (
    <>
      <article className={styles.card} onClick={handleOnClick}>
        <figure>
          <img src={posterUrl} alt="" width="200" />
        </figure>
        <div className={styles.movieCardTitle}>
          <h3>{person.name}</h3>
        </div>
      </article>
    </>
  );
};

export default PersonCard;
