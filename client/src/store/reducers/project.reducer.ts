const initialState = {
  details: null,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_PROJECT":
      return {
        ...state,
        details: action.project,
        error: false,
      };
    case "FETCH_PROJECT_FAIL":
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
