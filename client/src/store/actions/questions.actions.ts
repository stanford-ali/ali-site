import axios from "axios";

export const fetchQuestionsStart = () => {
  return {
    type: "FETCH_QUESTION_START",
  };
};

export const fetchQuestionFailed = () => {
  return {
    type: "FETCH_QUESTION_FAILED",
  };
};

export const loadQuestions = (questions) => {
  return {
    type: "LOAD_QUESTIONS",
    payload: questions,
  };
};

export const fetchQuestions = () => {
  return async (dispatch) => {
    dispatch(fetchQuestionsStart());
    await axios
      .get(`http://localhost:5000/questions`)
      .then((res) => dispatch(loadQuestions(res.data)))
      .catch(() => dispatch(fetchQuestionFailed()));
  };
};
