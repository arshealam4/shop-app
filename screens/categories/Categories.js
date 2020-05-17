import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import styles from "../../css/Styles";
import { getAllCategories } from "../../store/category";
import CategoryItem from "../../components/CatIegoryItem";
import HeaderButton from "../../components/HeaderButton";
import Badge from "../../components/Badge";
import { getCartItems } from "../../store/cart";

const Categories = (props) => {
  const categories = useSelector((state) => state.category.categories);
  const count = useSelector((state) => state.cart.count);

  const dispatch = useDispatch();

  const fetchCategories = async () => {
    await dispatch(getAllCategories());
  };

  useEffect(() => {
    dispatch(getCartItems());
    fetchCategories();
  }, [dispatch, getCartItems]);

  useEffect(() => {
    props.navigation.setParams({ count: count });
  }, [count]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        renderItem={(items) => (
          <CategoryItem items={items.item} navigation={props.navigation} />
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

Categories.navigationOptions = (navData) => {
  const count = navData.navigation.getParam("count");
  return {
    headerTitle: "Product Categories",
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
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Categories;
