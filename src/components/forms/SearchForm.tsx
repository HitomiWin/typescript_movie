import { FC } from "react";
import styles from "../../css/SearchForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InitialType } from "use-url-search-params";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  searchRef: React.RefObject<HTMLInputElement>;
  initialValue?: string | number | string[] | undefined;
}

const SearchForm: FC<Props> = ({ handleSubmit, searchRef, initialValue }) => {
  return (
    <div className={styles.searchContainer}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}>
        <input
          type="search"
          ref={searchRef}
          placeholder="Search for a movie, person..."
          className={styles.searchInput}
          defaultValue={initialValue}
        />
        <button type="submit" className={styles.searchBtn}>
          <FontAwesomeIcon className={styles.fas} icon={faSearch} />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
