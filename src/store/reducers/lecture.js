// import {
//     ADD_LECTURE,
//     EDIT_LECTURE,
//     DELETE_LECTURE,
//     GET_LECTURES
//   } from "../actions/types";
  
//   const initialState = {
//     current_lecture: {}
//   };
  
//   export default function (state = initialState, action) {
//     const {
//       type,
//         current_lecture
//     } = action;
//     switch (type) {
//       case ADD_LECTURE:
//         return {
//           ...state,
//           user_courses,
//         };
//       case GET_COURSE_DETAIL:
//         return {
//           ...state,
//           course_detail: { ...state.course_detail, ...course_detail },
//         };
//       case DELETE_COURSE:
//         const newObjCourses = state.all_courses;
//         const newUserCourses = state.user_courses;
  
//         delete newObjCourses[selectedId];
//         delete newUserCourses[selectedId];
//         return {
//           ...state,
//           all_courses: newObjCourses,
//           user_courses: newUserCourses,
//         };
//       case ADD_COURSE:
//       case EDIT_COURSE:
//         return {
//           ...state,
//           all_courses: {
//             ...state.all_courses,
//             [newCourse.id]: { course: newCourse },
//           },
//           user_courses: {
//             ...state.user_courses,
//             [newCourse.id]: { course: newCourse },
//           },
//         };
  
//       case REMOVE_COURSE_DETAIL:
//         return {
//           ...state,
//           course_detail: {},
//         };
//       case UNAUTHENTICATE:
//         return initialState;
//       default:
//         return state;
//     }
//   }
  