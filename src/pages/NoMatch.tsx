import React from "react";
import styles from "../css/Base.module.scss";

const NoMatch = () => {
  return (
    <div className={styles.marginAuto}>
      <h3>There are no movies that matched your query.</h3>
    </div>
  );
};

export default NoMatch;
