import React from "react";
import styles from "../css/Base.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.error}>
      <h2>Page Not Found: 404</h2>
    </div>
  );
};

export default NotFoundPage;
