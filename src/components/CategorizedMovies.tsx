import { FC } from "react";
import { useQuery } from "react-query";
import { FadeLoader } from "react-spinners";
import styles from "../css/Home.module.scss";
import { getCategorizedMovies } from "../services";
import { ICategoryTitle, ICategoryType } from "../shared/type";
import MovieCardList from "./lists/MovieCardList";

interface Props {
  readonly type: ICategoryType;
  readonly title: ICategoryTitle;
}
const CategorizedMovies: FC<Props> = ({ type, title }) => {
  const { isLoading, isError, error, data } = useQuery(type, () =>
    getCategorizedMovies(type)
  );

  if (isError) {
    if (error instanceof Error) {
      return (
        <div className={styles.error}>
          <h2 className={styles.errorText}>
            {" "}
            Something went wrong. Please reload the page.
          </h2>
        </div>
      );
    }
  }

  return (
    <section className={styles.homeContents}>
      <div className={`${styles.title} wContainer`}>
        <div>
          <h2 className={styles.headingTxt}>{title}</h2>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.spinner}>
          <FadeLoader />
        </div>
      ) : data ? (
        <MovieCardList data={data} />
      ) : null}
    </section>
  );
};

export default CategorizedMovies;
