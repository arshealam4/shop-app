import { StyleSheet } from "react-native";
import Colors from "./Colors";

const styles = StyleSheet.create({
  circle: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: "red",
    top: -12,
    left: 35,
  },
  count: { color: "#FFF", top: 0, left: 5 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  catContainer: {
    margin: 10,
    elevation: 5,
  },
  catItem: {
    width: 186,
    height: 130,
    backgroundColor: Colors.danger,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 30,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
  },
  productCaintainer: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    backgroundColor: "yellow",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Colors.light,
  },
});

export default styles;
