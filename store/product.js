import { createSlice } from "@reduxjs/toolkit";
import http from "../services/httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/products";

const slice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload.result;
    },
  },
});

// method
export const { getProducts } = slice.actions;

// reducer
export default slice.reducer;

export const getAllProducts = (params = {}) => {
  const catId = params && params.catId !== undefined ? params.catId : "";
  const search = params && params.search !== undefined ? params.search : "";
  const status = "active";
  let url = "";
  if (params.perPage && params.currentPage) {
    url = `${apiEndpoint}/get-all-product/${params.perPage}/${params.currentPage}?status=${status}&search=${search}&catId=${catId}`;
  } else {
    url = `${apiEndpoint}/get-all-product?status=${status}&search=${search}&catId=${catId}`;
  }

  return async (dispatch) => {
    try {
      const { data } = await http.get(url);
      dispatch(getProducts(data));
    } catch (error) {
      throw new Error(error);
    }
  };
};
