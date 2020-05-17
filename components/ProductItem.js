import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
// import styles from "../css/Styles";
import Colors from "../css/Colors";

const ProductItem = (props) => {
  const { items } = props;

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp
      style={styles.container}
      onPress={() => props.onSelect(items)}
    >
      <View style={styles.card}>
        <View style={styles.leftContainer}>
          <View style={styles.titles}>
            <Text style={styles.title}>{items.title}</Text>
            <Text style={styles.price}>${items.price}</Text>
          </View>
          <View style={styles.buttons}>
            <View style={styles.details}>
              <Button
                onPress={() => props.onSelect(items)}
                color={Colors.light}
                title="Details"
              />
            </View>
            <View style={styles.cart}>
              <Button
                onPress={() => props.onAddItem(items)}
                color={Colors.light}
                title="Add to Cart"
              />
            </View>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View>
            <Image style={styles.image} source={{ uri: items.img1 }} />
          </View>
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    width: 370,
    height: 230,
    padding: 5,
    margin: 10,
    borderRadius: 10,
    shadowColor: "green",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  leftContainer: {
    width: "35%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightContainer: {
    width: "60%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: 10,
  },
  titles: {
    alignItems: "center",
  },
  buttons: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    width: 110,
    backgroundColor: Colors.info,
    borderRadius: 10,
    shadowColor: "green",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  cart: {
    width: 110,
    backgroundColor: Colors.success,
    marginVertical: 15,
    borderRadius: 10,
    shadowColor: "green",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  image: { width: "100%", height: "100%" },
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: "red",
    paddingVertical: 10,
  },
});

export default ProductItem;
