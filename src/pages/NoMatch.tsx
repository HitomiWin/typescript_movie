import styles from "../css/Base.module.scss";

const NoMatch = () => {
  return (
    <h3 className={styles.center}>
      There are no movies that matched your query.
    </h3>
  );
};

export default NoMatch;
