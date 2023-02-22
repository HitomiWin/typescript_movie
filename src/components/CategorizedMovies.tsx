import { FC } from "react";
import { useQuery } from "react-query";
import styles from "../css/Home.module.scss";
import base from "../css/Base.module.scss";
import { getCategorizedMovies } from "../services";
import { ICategoryTitle, ICategoryType } from "../shared/type";
import MovieCardList from "./lists/MovieCardList";
import Loader from "./Loader";

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
        <div className={base.error}>
          <h2 className={base.errorText}>
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
      {isLoading ? <Loader /> : data ? <MovieCardList data={data} /> : null}
    </section>
  );
};

export default CategorizedMovies;
