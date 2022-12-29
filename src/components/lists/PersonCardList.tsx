import { FC } from "react";
import { Cast } from "../../shared/type";
import styles from "../../css/CardList.module.scss";
import PersonCard from "../cards/PersonCard";
interface Props {
  casts: Cast[];
}
const PersonCardList: FC<Props> = ({ casts }) => {
  const castArray = casts
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 20);
  return (
    <div className={`${styles.listContainer} wContainer`}>
      {castArray?.map((cast, i) => (
        <PersonCard person={cast} key={i} />
      ))}
    </div>
  );
};

export default PersonCardList;
