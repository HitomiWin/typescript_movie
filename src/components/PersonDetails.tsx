import { FC, useRef, MutableRefObject, useState } from "react";
import { Cast } from "../shared/type";
import styles from "../css/Person.module.scss";
import { useIsOverflow } from "../hooks/useIsOverFlow";
interface Props {
  readonly person: Cast;
}

const PersonDetail: FC<Props> = ({ person }) => {
  const [isExpand, setIsExpand] = useState(false);
  const posterUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w400${person.profile_path}`
    : null;
  const personBiography = person.biography;
  const bipgraphytexts = personBiography.split("\n\n");
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const isOverflow = useIsOverflow({
    ref,
    callback: (isOverflowFromCallback: boolean) => {
      return isOverflowFromCallback;
    },
  });

  const toggleReadMore = () => {
    setIsExpand(!isExpand);
  };

  return (
    <>
      <div className={`${styles.imgText}`}>
        <div
          className={`${styles.imgTextContainer}   ${
            isExpand && styles.expand
          } wContainer`}>
          <div className={styles.img}>
            <img
              src={posterUrl ?? "../../images/no-image-icon-23485.png"}
              alt=""
            />
          </div>
          <div
            className={`${styles.text} ${isExpand && styles.expand}`}
            ref={ref}>
            <div className={styles.textContents}>
              <h2 className={styles.head}>{person.name}</h2>
              <h3 className={styles.head}>Biography</h3>
              {bipgraphytexts.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
          {isOverflow && (
            <div className={styles.readMore} onClick={toggleReadMore}>
              {isExpand ? <span>...Read less</span> : <span>...Read more</span>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PersonDetail;
