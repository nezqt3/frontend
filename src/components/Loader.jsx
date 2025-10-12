import React from "react";
import Shadow from "../static/shadow.svg";
import "../styles/loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={Shadow} alt="ghost loader" />
      </div>
    </div>
  );
};

export default Loader;
