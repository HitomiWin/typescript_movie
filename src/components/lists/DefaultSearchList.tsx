import { FC, Dispatch } from "react";
import { Movies, People } from "../../shared/type";
import styles from "../../css/SearchList.module.scss";
import SearchList from "./SearchList";

interface Props {
  persons: People | undefined;
  movies: Movies | undefined;
  checkedValue: People | Movies | undefined;
  paramsPage: number | undefined;
}

const DefaultSearchList: FC<Props> = ({
  persons,
  movies,
  checkedValue,
  paramsPage,
}) => {
  console.log(checkedValue);
  if (movies && checkedValue === movies) {
    return <SearchList type={"movies"} data={checkedValue} defaultPage={1} />;
  } else if (persons && checkedValue === persons) {
    return <SearchList type={"persons"} data={checkedValue} defaultPage={1} />;
  } else {
    return (
      <>
        <p> No result match your search. Try again</p>
      </>
    );
  }

  // return (
  //   <>
  //     <p> No result match your search. Try again</p>
  //   </>
  // );
};

export default DefaultSearchList;
