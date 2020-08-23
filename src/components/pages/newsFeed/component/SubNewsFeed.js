import React from "react";
import CatergoryCard from "./CategoryCard";
import PopularArticles from "./PopularArticles";
import Archives from "./Archives";

const SubNewsFeed = ({ onClickCategory }) => {
  return (
    <>
      <CatergoryCard onClickCategory={onClickCategory} />
      <PopularArticles />
      {/* <Archives /> */}
    </>
  );
};

export default SubNewsFeed;
