import React, { FC, useState, useEffect } from "react";
import { People } from "../../shared/type";
import styles from "../../css/SearchList.module.scss";
import PersonCard from "../cards/PersonCard";
import PaginationButtons from "../buttons/PaginationButtons";

interface Props {
  readonly persons: Pick<People, "results" | "total_pages">;
  readonly isPreviousPersonsData: boolean;
  readonly page: number;
  readonly setPage: (page: number) => void;
  readonly paramsPage: number | undefined;
}

const PersonSearchList: FC<Props> = ({
  persons,
  isPreviousPersonsData,
  setPage,
  paramsPage,
}) => {
  const [personsPage, setPersonsPage] = useState(1);
  useEffect(() => {
    setPage(personsPage);
    return () => {
      setPage(1);
    };
  }, [personsPage, setPage]);

  return (
    <div className={styles.searchListContainer}>
      <div className={styles.searchListWrapper}>
        {persons.results.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
      <PaginationButtons
        page={personsPage}
        setPage={setPersonsPage}
        paramsPage={paramsPage}
        totalPages={persons.total_pages}
        isPreviousData={isPreviousPersonsData}
      />
    </div>
  );
};

export default PersonSearchList;
