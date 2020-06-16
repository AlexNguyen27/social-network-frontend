import {
  GET_QUESTION_DETAIL,
  GET_QUESTIONS,
  EDIT_QUESTION,
  ADD_COURSE,
  ADD_QUESTION,
  DELETE_QUESTION,
} from "../actions/types";

const initialState = {
  questions_bank: {},
  question_detail: {},
};

export default function (state = initialState, action) {
  const {
    type,
    questions_bank,
    question_detail,
    newQuestion,
    seletecId,
  } = action;
  switch (type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions_bank,
      };
    case GET_QUESTION_DETAIL:
      return {
        ...state,
        question_detail,
      };
    case EDIT_QUESTION:
    case ADD_QUESTION:
      return {
        questions_bank: {
          ...state.questions_bank,
          [newQuestion.id]: newQuestion,
        },
      };
    case DELETE_QUESTION:
      const newQuestionBank = questions_bank;
      delete newQuestionBank[seletecId];
      return {
        ...state,
        questions_bank: newQuestionBank,
      };
    default: {
      return state;
    }
  }
}
