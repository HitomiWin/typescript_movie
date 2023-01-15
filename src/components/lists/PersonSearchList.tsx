import { FC, useState, Dispatch } from "react";
import { People } from "../../shared/type";
import styles from "../../css/SearchList.module.scss";
import PersonCard from "../cards/PersonCard";

interface Props {
  persons: People;
  isPreviousPersonsData: boolean;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  paramsPage: number | undefined;
}

const PersonSearchList: FC<Props> = ({
  persons,
  isPreviousPersonsData,
  page,
  setPage,
  paramsPage,
}) => {
  const [personsPage, setPersonsPage] = useState(1);
  return (
    <div className={styles.searchListContainer}>
      <div className={styles.searchListWrapper}>
        {persons.results.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default PersonSearchList;
