import { createSlice } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";

const slice = createSlice({
  name: "orders",
  initialState: {
    orderItems: [],
  },
  reducers: {
    getOrders: (state, action) => {
      state.orderItems = action.payload;
    },
    addOrder: (state, action) => {
      state.orderItems.unshift(action.payload);
      AsyncStorage.setItem("orders", JSON.stringify(state.orderItems));
    },
  },
});

// method
export const { getOrders, addOrder } = slice.actions;

// reducer
export default slice.reducer;

export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const orders = (await AsyncStorage.getItem("orders"))
        ? JSON.parse(await AsyncStorage.getItem("orders"))
        : [];
      // const { data } = await http.get(`${apiEndpoint}/get-all-order`);
      dispatch(getOrders(orders));
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const addOrders = (order, totalAmount) => {
  return async (dispatch) => {
    try {
      const data = { order, totalAmount, date: new Date().toDateString() };
      // const { data } = await http.post(`${apiEndpoint}/add-order`, data);
      dispatch(addOrder(data));
    } catch (error) {
      throw new Error(error);
    }
  };
};
