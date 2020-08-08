const initialState = {
  details: null,
  error: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_PROJECT":
      return {
        ...state,
        details: action.project,
        loading: false,
        error: false,
      };
    case "FETCH_PROJECT_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_PROJECT_FAIL":
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
