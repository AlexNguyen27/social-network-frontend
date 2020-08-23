import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import PageLoader from "../../../../custom/PageLoader";
import { makeStyles, formatMs } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import EditIcon from "@material-ui/icons/Edit";
import TreeItem from "@material-ui/lab/TreeItem";
import {
  Paper,
  Typography,
  Divider,
  Grid,
  IconButton,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import Delete from "@material-ui/icons/Delete";
import { Button } from "reactstrap";
import TextFieldInputWithHeader from "../../../../custom/TextFieldInputWithheader";
import { GET_ERRORS, BASE_IMAGE_URL } from "../../../../../store/actions/types";
import {
  addComment,
  deleteComment,
} from "../../../../../store/actions/comment";
import Swal from "sweetalert2";
import EditReportModal from "../../../report/component/EditReportModal";
import EditCommentModal from "./EditCommentModal";

// const data = {
//   id: "root",
//   name: "Parent",
//   children: [
//     {
//       id: "1",
//       name: "Child - 1",
//     },
//     {
//       id: "3",
//       name: "Child - 3",
//       children: [
//         {
//           id: "4",
//           name: "Child - 4",
//         },
//       ],
//     },
//   ],
// };

// const data1 = [
//   {
//     id: "1",
//     name: "Parent",
//     children: [
//       {
//         id: "21",
//         name: "Child - 1",
//       },
//       {
//         id: "23",
//         name: "Child - 3",
//         children: [
//           {
//             id: "4",
//             name: "Child - 4",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "Parent",
//     children: [
//       {
//         id: "33",
//         name: "Child - 1",
//       },
//       {
//         id: "22",
//         name: "Child - 3",
//         children: [
//           {
//             id: "12",
//             name: "Child - 4",
//           },
//         ],
//       },
//     ],
//   },
// ];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  formRoot: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  btnDelete: {
    fontSize: "12px !important",
    padding: 0,
    marginTop: "5px",
    marginBottom: "10px",
    marginRight: "10px",
  },
  iconSize: {
    fontSize: "16px !important",
    marginRight: "2px",
  },
}));

const CommentsList = ({
  comments,
  errors,
  addComment,
  postId,
  authId,
  deleteComment,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [onEditModel, setOnEditModal] = useState();
  const [commentData, setCommentData] = useState();

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const handleOnDelete = (commentId) => {
    Swal.fire({
      title: `Are you sure to delete this ?`,
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        setLoading(true);
        // deletePost(setLoading, postId);
        deleteComment(setLoading, commentId);
        console.log(commentId);
      }
    });
  };

  const handleOnEditComment = (commentData) => {
    setOnEditModal(true);
    setCommentData(commentData);
  };

  const renderTree = (nodes) => (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <Avatar
            alt="Remy Sharp"
            src={nodes.user.imageUrl || BASE_IMAGE_URL}
          />
        </Grid>
        <Grid item>
          <Typography variant="caption" component="span">
            {nodes.user.firstName} {nodes.user.lastName}
            {" | "}
          </Typography>
          <Typography
            variant="caption"
            component="span"
            style={{ color: "#888" }}
          >
            {moment(nodes.updatedAt).format("LLLL")}
          </Typography>
          <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.comment}>
            {Array.isArray(nodes.children)
              ? nodes.children.map((node) => renderTree(node))
              : null}
          </TreeItem>
          {nodes.userId === authId ? (
            <>
              <IconButton
                aria-label="detete"
                className={classes.btnDelete}
                onClick={() => handleOnDelete(nodes.id)}
              >
                <Delete className={classes.iconSize} />
                Delete
              </IconButton>
              <IconButton
                aria-label="detete"
                className={classes.btnDelete}
                onClick={() => handleOnEditComment(nodes)}
              >
                <EditIcon className={classes.iconSize} />
                Edit
              </IconButton>
            </>
          ) : (
            <div className="mb-3"></div>
          )}
        </Grid>
      </Grid>
    </>
  );

  const formatData = (comments = []) => {
    const list = comments;
    const map = {};
    const roots = [];

    list.forEach((comment) => {
      const node = comment;
      node.children = false;
      map[node.id] = node;
    });

    // let indexChar = 0;
    list.forEach((comment) => {
      const node = comment;
      if (node.parentId) {
        const parent = map[node.parentId];
        const latestNo = parent.no;
        if (parent.children) {
          // node.no = `${latestNo}.${parent.children.length + 1}`;
          parent.children = [...parent.children, node];
        } else {
          // node.no = `${latestNo}.${1}`;
          parent.children = [node];
        }
      } else {
        // node.no = String.fromCharCode(indexChar + 65);
        // indexChar += 1;
        roots.push(node);
      }
    });
    return roots;
  };

  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();

    let error = {};
    if (comment.trim() === "") {
      error.comment = "Enter your comment!";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      addComment(setLoading, comment, postId);
    }
    setComment("");
  };

  const formatedComment = formatData(comments);

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <Grid container className="mb-3">
        <Grid item xs={12}>
          <form
            onSubmit={(e) => onSubmit(e)}
            className={classes.formRoot}
            autoComplete="off"
          >
            <TextFieldInputWithHeader
              id="outlined-multiline-flexible"
              name="comment"
              label="Your Comment"
              fullWidth
              variant="outlined"
              value={comment}
              onChange={onChange}
              error={errors.comment}
            />
          </form>
        </Grid>
      </Grid>
      {formatedComment.map((item) => renderTree(item))}
      <EditCommentModal
        modal={onEditModel}
        setModal={setOnEditModal}
        commentData={commentData}
      />
    </TreeView>
  );
};

const mapStateToProps = (state) => ({
  comments: state.post.selected_post.comments,
  errors: state.errors,
  authId: state.auth.user.id,
});
export default connect(mapStateToProps, { addComment, deleteComment })(
  CommentsList
);
