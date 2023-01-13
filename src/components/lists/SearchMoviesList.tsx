import React from "react";

const SearchMoviesList = () => {
  return <p>SearchMoviesList</p>;
};

export default SearchMoviesList;
// import { FC, Dispatch } from "react";
// import { Movies, People } from "../../shared/type";
// import MovieCard from "../cards/MovieCard";
// import PersonCard from "../cards/PersonCard";
// import styles from "../../css/SearchList.module.scss";
// import PaginationButtons from "../../components/buttons/PagenationButtons";

// interface Props {
//   data: People | Movies | undefined;
//   checkedValue: People | Movies | undefined;
//   isPreviousData: boolean;
// }
// const SearchList: FC<Props> = ({
// data,
//   checkedValue,
//   isPreviousData,
// }) => {
//   if (checkedValue === data) {
//     if (!data) {
//       return (
//         <>
//           <p> No result match your search. Try again</p>
//         </>
//       );
//     }
//     return (
//       <div className={styles.searchListContainer}>
//         <div className={styles.searchListWrapper}>
//           {data?.results.map((d) => (
//             <MovieCard key={data.id} movie={data} />
//           ))}
//         </div>
//         <PaginationButtons
//           page={page}
//           setPage={setPage}
//           paramsPage={paramsPage}
//           totalPages={movies.total_pages}
//           isPreviousData={isPreviousMoviesData}
//         />
//       </div>
//     );
//   }
//   if (checkedValue === persons) {
//     if (!persons) {
//       return (
//         <>
//           <p> No result match your search. Try again</p>
//         </>
//       );
//     }
//     return (
//       <div className={styles.searchListContainer}>
//         <div className={styles.searchListWrapper}>
//           {persons?.results.map((person) => (
//             <PersonCard key={person.id} person={person} />
//           ))}
//         </div>
//         <PaginationButtons
//           page={page}
//           setPage={setPage}
//           paramsPage={paramsPage}
//           totalPages={persons.total_pages}
//           isPreviousData={isPreviousPersonsData}
//         />
//       </div>
//     );
//   }
//   return (
//     <>
//       <p> No result match your search. Try again</p>
//     </>
//   );
// };

// export default SearchList;
