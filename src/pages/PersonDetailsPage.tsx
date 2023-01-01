import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPerson } from "../services";
import { FadeLoader } from "react-spinners";
import home from "../css/Home.module.scss";
import PersonDetail from "../components/PersonDetails";
import MoviesByPerson from "../components/MoviesByPerson";

const PersonDetailsPage = () => {
  const { person_id } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    ["person", person_id],
    () => getPerson(Number(person_id))
  );

  if (isLoading) {
    return (
      <div className={home.spinner}>
        <FadeLoader />
      </div>
    );
  }
  if (isError) {
    if (error instanceof Error) {
      return (
        <div className={home.error}>
          <h2 className={home.errorText}>
            Something went wrong. Please reload the page.
          </h2>
        </div>
      );
    }
  }
  return (
    <>
      <section>{data ? <PersonDetail person={data} /> : null}</section>
      <section>{data ? <MoviesByPerson person_id={data.id} /> : null}</section>
    </>
  );
};

export default PersonDetailsPage;
