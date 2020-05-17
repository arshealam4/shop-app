import React from "react";
import { Text, View } from "react-native";
import styles from "../css/Styles";

const Badge = ({ count }) => {
  return (
    count > 0 && (
      <View style={styles.circle}>
        <Text style={styles.count}>{count}</Text>
      </View>
    )
  );
};

export default Badge;
