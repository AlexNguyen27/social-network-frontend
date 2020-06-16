import React from "react";
import white_logo from "../../images/white_logo.png";

const Landing = () => {
  return (
    <div className="text-center mt-4">
      <img
        className="center-block"
        width="489px"
        height="240px"
        src={white_logo}
        alt="LATTC Logo"
      />
    </div>
  );
};

export default Landing;
