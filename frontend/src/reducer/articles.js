const initialState = {
  article: [],
};

const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ARTICLES":
      return { article: [...payload] };
    case "ADD_ARTICLE":
      return { article: [...state.article, payload] };
    case "UPDATE_ARTICLE":
      return state.article.map((ele, i) => {
        if (payload.id === state.article.id) return payload;
        return ele;
      });
    case "DELETE_ARTICLE":
      return state.article.filter((ele) => {
        return ele.id !== payload.id;
      });
    default:
      return state;
  }
};

export default articleReducer;
//Action

export const setArticle = (articles) => {
  return { type: "SET_ARTICLES", payload: articles };
};
export const createArticle = (articles) => {
  return { type: "ADD_ARTICLE", payload: articles };
};
export const updateArticle = (articles) => {
  return { type: "UPDATE_ARTICLE", payload: articles };
};
export const deleteArticle = (articleDeleted) => {
  return { type: "DELETE_ARTICLE", payload: articleDeleted };
};
