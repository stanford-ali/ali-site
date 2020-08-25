const initialState = {
  loading: false,
  questions: null,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_QUESTION_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_QUESTION_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "LOAD_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
