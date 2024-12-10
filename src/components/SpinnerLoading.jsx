import React from "react";
//import { FaSpinner } from "react-icons/fa";
import "./SpinnerLoading.css";

const SpinnerLoading = ({ size = "2em", color = "#3b0764" }) => {
  return (
    <div className="wrap">
      <div className="loader">
        <div className="react-star">
          <div className="nucleus"></div>
          <div className="electron electron1"></div>
          <div className="electron electron2"></div>
          <div className="electron electron3"></div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerLoading;
