import { Dispatch, FC } from "react";
import styles from "../../css/PaginationButtons.module.scss";

interface Props {
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  paramsPage: number | undefined;
  totalPages: number;
  isPreviousData: boolean;
}

const PagenationButtons: FC<Props> = ({
  page,
  setPage,
  paramsPage,
  totalPages,
  isPreviousData,
}) => {
  let pages = [];
  // const pageAmount = useMemo(
  //   () => (totalPages < 8 ? totalPages : 7),

  //   [totalPages]
  // );
  for (let i = 1; i < totalPages; i++) {
    pages.push(i);
  }
  console.log(pages);

  return (
    <div className={styles.pagination}>
      <ul>
        {pages.map((page) => (
          <li
            className={`${paramsPage === page ? "active" : "inactive"} list`}
            key={page}>
            <span>{page}</span>
          </li>
        ))}
      </ul>
      {/* <button
        onClick={() => setPage((current) => Math.max(current - 1, 1))}
        disabled={page === 1}>
        Prev
      </button>

      <h5>Current Page: {paramsPage}</h5>

      <button
        onClick={() => {
          if (!isPreviousData && page !== totalPages)
            // isPrevious data used while the server fetch new data
            setPage((current) => current + 1);
        }}
        disabled={isPreviousData || page === totalPages}>
        Next
      </button> */}
    </div>
  );
};

export default PagenationButtons;
