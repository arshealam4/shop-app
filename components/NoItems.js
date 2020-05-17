import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../css/Colors";

const NoItem = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Colors.info,
  },
});

export default NoItem;
