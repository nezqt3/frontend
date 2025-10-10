import React from "react";
import Shadow from "../static/shadow.svg";
import "../styles/loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={Shadow} alt="loader" className="loader" />
    </div>
  );
};

export default Loader;
