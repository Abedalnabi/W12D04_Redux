import { createStore, combineReducers } from "redux";

import login from "./login";
import article from "./articles";

const reducer = combineReducers({ login, article });

const store = createStore(reducer);

export default store;
