import React, { FC, CSSProperties } from "react";
import { FadeLoader } from "react-spinners";
import base from "../css/Base.module.scss";

const Loader: FC = () => {
  const override: CSSProperties = {
    display: "block",
    borderColor: "yellowgreen",
  };
  return (
    <div className={base.spinner}>
      <FadeLoader
        cssOverride={override}
        color="yellowgreen"
        aria-label="Loading Spinner"
      />
    </div>
  );
};

export default Loader;
