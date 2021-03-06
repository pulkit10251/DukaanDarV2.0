import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AdminProductsCard from "../../components/UI/AdminProductsCard";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as ShopActions from "../../store/actions/ShopAction";

const AddProductScreen = (props) => {
  const shopId = props.navigation.getParam("shopId");
  const catId = props.navigation.getParam("catId");
  const locId = props.navigation.getParam("LocId");

  const shopData = useSelector((state) => state.shops.ShopData);

  const shop = shopData[shopId];
  const category = shop.shop_Categories.find(
    (item) => item.category_Id === catId
  );

  const localCat = category.category_Local.find(
    (item) => item.Local_Id === locId
  );

  const ProductNavigate = (shopId, GlobalId, product) => {
    props.navigation.navigate("EditProduct", {
      shopId: shopId,
      GlobalId: GlobalId,
      product: product,
    });
  };

  const products = localCat.category_Products;

  const dispatch = useDispatch();


  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.prod_Id)}
        renderItem={(itemData) => (
          <AdminProductsCard
            product={itemData.item}
            prod_Name={itemData.item.prod_Name}
            prod_Image={itemData.item.prod_ImageUrl}
            shopId={shopId}
            catId={catId}
            locId={locId}
            dispatch={dispatch}
            editNavigate={ProductNavigate}
          />
        )}
      />
    </View>
  );
};

AddProductScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "DukaanDar",

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            const ShopId = NavData.navigation.getParam("shopId");
            const GlobalId = NavData.navigation.getParam("catId");
            const LocalId = NavData.navigation.getParam("LocId");
            NavData.navigation.navigate("AddProduct", {
              shopId: ShopId,
              GlobalId: GlobalId,
              LocalId: LocalId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default AddProductScreen;
