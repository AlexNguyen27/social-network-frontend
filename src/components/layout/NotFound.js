import React from "react";

const NotFound = ({ alertText, descriptionText, center }) => {
  return (
    <div className={`my-3 ${center ? "text-center" : ""}`}>
      <h1 className="text-primary">
        <i className="fas fa-exclamation-triangle" />{" "}
        {alertText || "Page Not Found"}
      </h1>

      <p> {descriptionText || "Sorry, this page does not exists"}</p>
    </div>
  );
};

export default NotFound;
