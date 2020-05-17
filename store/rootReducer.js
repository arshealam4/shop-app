import { combineReducers } from "redux";
import category from "./category";
import product from "./product";
import cart from "./cart";
import order from "./order";

export default combineReducers({
  category,
  product,
  cart,
  order,
});
