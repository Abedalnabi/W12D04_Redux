const intialState = {
  token: "",
};

const tokenReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case "SET_TOKEN":
      return { token: payload };
    default:
      return state;
  }
};
export default tokenReducer;

export const setToken = (token) => {
  return { type: "SET_TOKEN", payload: token };
};
