import { createSlice } from "@reduxjs/toolkit";
import http from "../services/httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/category";

const slice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    getCategories: (state, action) => {
      const category = [
        {
          title: "All",
          _id: "1",
        },
      ].concat(action.payload.result);
      state.categories = category;
    },
  },
});

// method
export const { getCategories } = slice.actions;

// reducer
export default slice.reducer;

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await http.get(`${apiEndpoint}/get-all-category`);
      dispatch(getCategories(data));
    } catch (error) {
      throw new Error(error);
    }
  };
};
