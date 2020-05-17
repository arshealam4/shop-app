import React, { useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../../css/Colors";
import NoItem from "../../components/NoItems";
import HeaderButton from "../../components/HeaderButton";
import {
  removeItemFromCart,
  emptyCartItems,
  getCartItems,
} from "../../store/cart";
import { addOrders } from "../../store/order";

const Cart = (props) => {
  console.log("props.navigation", props.navigation);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const count = useSelector((state) => state.cart.count);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const removeItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const orderHandler = useCallback(() => {
    dispatch(addOrders(cartItems, totalAmount));
    dispatch(emptyCartItems());

    props.navigation.navigate("Order");
  }, [dispatch, addOrders, emptyCartItems]);

  const removeAllItems = useCallback(() => {
    dispatch(emptyCartItems());
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ removeAll: removeAllItems });
  }, [removeAllItems]);

  useEffect(() => {
    props.navigation.setParams({ count: count });
  }, [count]);

  if (cartItems.length === 0) {
    return <NoItem data="Cart is Empty, Please Add Some!" />;
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Quantity</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Total</Text>
        <Text style={styles.headerText}></Text>
      </View>
      {cartItems.map((item) => (
        <View style={styles.items} key={item.id}>
          <Text style={styles.itemText}>{item.title}</Text>
          <Text style={styles.itemText}>{item.quantity}</Text>
          <Text style={styles.itemText}>{item.price}</Text>
          <Text style={styles.itemText}>{item.total}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.header}>
        <Text style={styles.headerText}>Total Amount:</Text>
        <Text style={styles.headerText}>{totalAmount}</Text>
      </View>
      <View style={styles.order}>
        <View style={styles.orderButton}>
          <Text style={styles.headerText} onPress={orderHandler}>
            ORDER NOW
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

Cart.navigationOptions = (navData) => {
  const removeAllItem = navData.navigation.getParam("removeAll");
  const count = navData.navigation.getParam("count");
  return {
    headerTitle: "Cart",
    headerRight: count > 0 && (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-trash" : "ios-trash"}
          onPress={removeAllItem}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    backgroundColor: Colors.danger,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
    color: Colors.light,
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
  },
  itemText: {
    fontSize: 14,
    fontFamily: "open-sans",
    color: Colors.primary,
  },
  order: {
    alignItems: "center",
    justifyContent: "center",
  },
  orderButton: {
    width: "40%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.warning,
    borderRadius: 10,
    shadowColor: "green",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
});

export default Cart;
