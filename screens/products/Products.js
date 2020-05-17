import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, FlatList, AsyncStorage, Platform } from "react-native";
import { getAllProducts } from "../../store/product";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import styles from "../../css/Styles";
import ProductItem from "../../components/ProductItem";
import { addItemToCart } from "../../store/cart";
import HeaderButton from "../../components/HeaderButton";
import Badge from "../../components/Badge";
import { getCartItems } from "../../store/cart";
import { getAllOrders } from "../../store/order";

const Products = (props) => {
  const products = useSelector((state) => state.product.products);
  const count = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();

  const prductDetailsPage = async (items) => {
    await AsyncStorage.setItem("product", JSON.stringify(items));
    props.navigation.navigate("ProductDetails", { productTitle: items.title });
  };

  useEffect(() => {
    dispatch(getCartItems());
    dispatch(getAllOrders());
  }, [dispatch, getCartItems, getAllOrders]);

  const addItemToCartHandler = (item) => {
    dispatch(addItemToCart(item));
  };

  useEffect(() => {
    props.navigation.setParams({ count: count });
  }, [count]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={(items) => (
          <ProductItem
            items={items.item}
            navigation={props.navigation}
            onSelect={prductDetailsPage}
            onAddItem={addItemToCartHandler}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

Products.navigationOptions = (navData) => {
  const count = navData.navigation.getParam("count");
  return {
    headerTitle: navData.navigation.getParam("categoryTitle"),
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

export default Products;
