import { FC } from "react";
import { Cast } from "../shared/type";
import styles from "../css/Person.module.scss";
interface Props {
  readonly person: Cast;
}
const Personstyles: FC<Props> = ({ person }) => {
  const posterUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w400${person.profile_path}`
    : null;
  const personBiography = person.biography;
  const bipgraphytexts = personBiography.split("\n\n");

  return (
    <>
      <div className={`${styles.imgText}`}>
        <div className={`${styles.imgTextContainer}  wContainer`}>
          <img
            className={styles.img}
            src={posterUrl ?? "../../images/no-image-icon-23485.png"}
            alt=""
          />
          <div className={styles.text}>
            <div className={styles.textContents}>
              <h2 className={styles.head}>{person.name}</h2>
            </div>
            <div className={styles.textContents}>
              <h3 className={styles.head}>Biography</h3>
              {bipgraphytexts.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Personstyles;
