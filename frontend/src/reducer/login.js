const intialState = {
  token: "",
};

const loginReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case "SET_TOKEN":
      return { token: payload };
    default:
      return state;
  }
};
export default loginReducer;

export const setToken = (token) => {
  return { type: "SET_TOKEN", payload: token };
};
