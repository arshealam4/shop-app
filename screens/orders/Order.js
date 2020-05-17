import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../css/Colors";
import NoItem from "../../components/NoItems";
import { getAllOrders } from "../../store/order";

const Order = (props) => {
  const orderItems = useSelector((state) => state.order.orderItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (orderItems.length === 0) {
    return <NoItem data="Order is Empty, Please Order Some!" />;
  }

  return (
    <ScrollView>
      <View
        style={{
          ...styles.header,
          backgroundColor: Colors.danger,
          marginTop: 50,
        }}
      >
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Quantity</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Total</Text>
      </View>
      {orderItems.map((orders, index) => (
        <View key={index}>
          {orders.order.map((item, index) => (
            <View style={styles.items} key={index}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.itemText}>{item.quantity}</Text>
              <Text style={styles.itemText}>{item.price}</Text>
              <Text style={styles.itemText}>{item.total}</Text>
            </View>
          ))}
          <View style={styles.header}>
            <Text style={styles.headerText}>Total Amount:</Text>
            <Text style={styles.headerText}>{orders.totalAmount}</Text>
            <Text style={styles.headerText}>{orders.date}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    backgroundColor: Colors.success,
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
});

export default Order;
