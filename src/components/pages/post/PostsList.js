import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getUsers,
  editUserInfo,
  deleteUser,
} from "../../../store/actions/user";
import { SAVE_CURRENT_USER } from "../../../store/actions/types";
import { DATE_TIME } from "../../../utils/common";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Visibility from "@material-ui/icons/Visibility";

import PageLoader from "../../custom/PageLoader";
import Swal from "sweetalert2";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const PostsList = ({
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "title"},
      { title: "Category", field: "category" },
      { title: "Status", field: "status" },
      { title: "Author", field: "author" },
      { title: "Like", field: "totalLike" },
      { title: "Dislike", field: "totalDislike" },
      {
        title: "Created at",
        field: "createdAt",
        editable: "never"
      },
      {
        title: "Updated at",
        field: "updatedAt",
        editable: "never"
      },
    ],
    data: [
      {
        title: "Weather",
        category: "Home",
        status: "public",
        author: "Thanh Nguyen",
        totalLike: 100,
        totalDislike: 10,
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
        updatedAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
  }, [loading]);


  const getDateTime = (date) => moment(date).format(DATE_TIME);

  // const usersArray = Object.keys(users).map((userId) => ({
  //   ...users[userId],
  //   createdAt: getDateTime(users[userId].createdAt),
  //   updatedAt: getDateTime(users[userId].updatedAt),
  //   fullname: getFullname(users[userId].firstName, users[userId].lastName),
  // }));

  return (
    <PageLoader loading={loading}>
      <div style={{ maxWidth: `100%`, overflowX: 'auto' }}>
        <MaterialTable
          icons={tableIcons}
          title="List Of Posts"
          columns={state.columns}
          data={state.data || []}
          options={{
            pageSize: 8,
            headerStyle: {
              fontWeight: "bold",
            },
            rowStyle: {
              overflowX: 'auto'
            }
          }}
          actions={[
            {
              icon: () => <Edit />,
              tooltip: "Edit Post",
              onClick: (event, rowData) => {
                console.log("edit---", rowData);
                // dispatch({
                //   type: SAVE_CURRENT_USER,
                //   currentUser: rowData,
                // });
                // history.push(`/edit-user/${rowData.id}`);
                // Do save operation
              },
            },
            {
              icon: () => <Delete />,
              tooltip: "Delete Post",
              onClick: (event, rowData) => {
                Swal.fire({
                  title: `Are you sure to delete ?`,
                  text: "You won't be able to revert this!",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.value) {
                    setLoading(true);
                    // deleteUser(setLoading, rowData.id);
                  }
                });
              },
            },
            {
              icon: () => <Visibility />,
              tooltip: "View Post",
              onClick: (event, rowData) => {
                // history.push(`user-profile/${rowData.id}`)
                // Do save operation
              },
            },
          ]}
          // editable={{
          //   onRowAdd: (newData) =>
          //     new Promise((resolve) => {
          //       setTimeout(() => {
          //         resolve();
          //         Swal.fire({
          //           position: "center",
          //           type: "error",
          //           title: "Admin can not add new user \n Add new account when register",
          //           showConfirmButton: false,
          //           timer: 1500,
          //         });
          //       }, 600);
          //     }),
            
          // }}
        />
      </div>
    </PageLoader>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {
})(withRouter(PostsList));
