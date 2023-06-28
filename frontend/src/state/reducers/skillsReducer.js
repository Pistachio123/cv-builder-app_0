/** @format */

const initialState = [];

const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SKILL":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default skillReducer;
