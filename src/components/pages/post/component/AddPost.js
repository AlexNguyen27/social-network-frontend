import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PageTitle from "../../../custom/PageTitle";
import TextEditor from "./TextEditor";
import Button from "@material-ui/core/Button";
import { Row } from "reactstrap";
import { Grid } from "@material-ui/core";
import DropdownV2 from "../../../custom/DropdownV2";
import { addNewPost } from "../../../../store/actions/post";

const blogData1 = {
  textBody: "body",
  pageId: "1",
  pageName: "Enter your title",
};

const status = [
  { id: 0, name: "Private", value: "private" },
  { id: 1, name: "Public", value: "public" },
];

const AddPost = ({ preDefinedPageContents, categories, addNewPost }) => {
  // IF THERE IS PRE-DEFINED PAGE CONTENTS, INITIALIZE BLOG DATA WITH IT
  const [blogData, setBlogData] = useState(preDefinedPageContents || blogData1);
  // DESTRUCTURE BLOG DATA
  const { textBody, pageId, pageName } = blogData || {};

  const categoryArr = Object.keys(categories).map((key) => categories[key]);

  // status: 0: private, 1: public
  const [selectedDropdownData, setSelectedDropdownData] = useState({
    selectedCategoryIndex: categoryArr[0].id,
    selectedStatusIndex: 0,
  });

  const { selectedCategoryIndex, selectedStatusIndex } = selectedDropdownData;

  // HANDLE CHANGE IN TEXT EDITOR
  const onChangeEditor = (textBody) => {
    setBlogData({
      ...blogData,
      textBody,
    });
    // updateBlog(pageId, textBody);
  };

  // HANDLE PAGE TITLE INPUT
  const onEnterPageName = (e) => {
    setBlogData({
      ...blogData,
      pageName: e.target.value,
    });
  };

  const onSelectCategory = (selectedCategoryIndex) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedCategoryIndex,
    });
  };

  const onSelectStatus = (selectedStatusIndex) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedStatusIndex,
    });
  };

  const handleOnSubmit = () => {
    console.log("blogData", blogData);
    console.log(selectedDropdownData);
    const status = selectedStatusIndex === 0 ? "private" : "public";
    addNewPost({
      bodyText: textBody,
      title: pageName,
      categoryId: selectedCategoryIndex,
      status,
    });
  };

  return (
    <Fragment>
      <PageTitle
        title={pageName}
        onChange={onEnterPageName}
        center="true"
        editMode="true"
      />
      <Grid container justify="flex-end">
        <Grid item xs={4}>
          <DropdownV2
            fullWidth
            label="Category"
            value={selectedCategoryIndex.toString()}
            options={categoryArr || []}
            valueBasedOnProperty="id"
            displayProperty="name"
            onChange={(categoryIndex) => onSelectCategory(categoryIndex)}
          />
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <Grid item xs={2}>
          <DropdownV2
            fullWidth
            label="Status"
            value={selectedStatusIndex.toString()}
            options={status || []}
            valueBasedOnProperty="id"
            displayProperty="name"
            onChange={(statusIndex) => onSelectStatus(statusIndex)}
          />
        </Grid>
      </Grid>

      <hr className="mb-0" />
      <TextEditor
        className="blog"
        value={textBody}
        onChange={onChangeEditor}
        placeholder="Enter text here"
      />
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          style={{}}
          onClick={() => handleOnSubmit()}
        >
          Submit
        </Button>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  //   preDefinedPageContents: state.edit_view_page.page_contents[0]
});
export default connect(mapStateToProps, { addNewPost })(AddPost);
