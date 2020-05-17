import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../css/Styles";

const CategoryItem = (props) => {
  const { items } = props;

  const productPage = (items) => {
    props.navigation.navigate("Products", {
      categoryTitle: items.title,
    });
  };
  return (
    <TouchableOpacity onPress={() => productPage(items)}>
      <View style={styles.catContainer}>
        <View style={styles.catItem}>
          <Text style={styles.title}>{items.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;
