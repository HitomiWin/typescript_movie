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
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : "./images/no-image-icon-23485.png";
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
      <div className={`${styles.imgText} wContainer`}>
        <div className={`${styles.imgTextContainer}`}>
          <div className={styles.img}>
            <img src={posterUrl} alt="" />
          </div>
          <div className={`${styles.text} `}>
            <div
              className={`${styles.textContents} ${
                isExpand ? styles.expand : ""
              }`}
              ref={ref}>
              <h2 className={styles.head}>{person.name}</h2>
              <h3 className={styles.head}>Biography</h3>
              {bipgraphytexts.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
            {!isOverflow && !isExpand ? null : (
              <div className={styles.readMore} onClick={toggleReadMore}>
                {isExpand ? (
                  <span>...Read less</span>
                ) : (
                  <span>...Read more</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonDetail;
