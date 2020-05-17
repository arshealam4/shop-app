import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../css/Colors";
import { addItemToCart } from "../../store/cart";
import HeaderButton from "../../components/HeaderButton";
import Badge from "../../components/Badge";

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cart.count);

  const getData = useCallback(async () => {
    const product = JSON.parse(await AsyncStorage.getItem("product"));
    setProduct(product);
  }, [setProduct]);

  useEffect(() => {
    getData();
  }, [getData]);

  const addItemToCartHandler = (item) => {
    dispatch(addItemToCart(item));
  };
  useEffect(() => {
    props.navigation.setParams({ count: count });
  }, [count]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: product.img1,
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.status}>
          {product.status === "in stock" ? "IN STOCK" : "OUT OF STOCK"}
        </Text>
        <Text style={styles.color}>{product.color} Colors</Text>
        <Text style={styles.size}>{product.size}cm</Text>
        <Text style={styles.weight}>{product.weight}gm</Text>
        <Text style={styles.material}>{product.material}</Text>
        {/* <Text style={styles.quantity}>minimum order {product.quantity}</Text> */}
        <Text style={styles.description}>{product.description}</Text>
      </View>
      <View style={styles.action}>
        <Button
          color={Colors.light}
          onPress={() => addItemToCartHandler(product)}
          title="ADD TO CART"
        />
      </View>
    </ScrollView>
  );
};

ProductDetails.navigationOptions = (navData) => {
  const count = navData.navigation.getParam("count");
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Badge count={count} />
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  image: {
    width: "90%",
    height: 350,
  },
  title: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Colors.danger,
    paddingVertical: 5,
  },
  status: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Colors.primary,
    paddingVertical: 5,
  },
  color: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Colors.success,
    paddingVertical: 5,
  },
  size: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Colors.info,
    paddingVertical: 5,
  },
  weight: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Colors.warning,
    paddingVertical: 5,
  },
  material: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    color: Colors.inverse,
    paddingVertical: 5,
  },
  quantity: {
    fontSize: 15,
    fontFamily: "open-sans",
    color: Colors.primary,
    paddingVertical: 5,
  },
  description: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  action: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.danger,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});

export default ProductDetails;
