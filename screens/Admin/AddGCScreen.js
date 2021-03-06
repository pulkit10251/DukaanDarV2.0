import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AdminCategoriesCard from "../../components/UI/AdminCategoriesCard";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as ShopActions from "../../store/actions/ShopAction";

const AddGCScreen = (props) => {
  const shopId = props.navigation.getParam("shopId");
  const shop = useSelector((state) =>
    state.shops.ShopData[shopId]
  );

  const shopData = useSelector((state) => state.shops.ShopData);

  const dispatch = useDispatch();


  const categories = shop.shop_Categories;
  useEffect(() => {
    props.navigation.setParams({ ShopId: shopId });
  }, []);

  const LocalCategoryNavigate = (catId, shopId) => {
    props.navigation.navigate("Local", {
      catId: catId,
      shopId: shopId,
    });
  };

  const EditGlobalCategory = (shopId, catName, ImageUrl, catId) => {
    props.navigation.navigate("EditGlobal", {
      shopId: shopId,
      catName: catName,
      ImageUrl: ImageUrl,
      catId: catId,
    });
  };

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => String(item.category_Id)}
        renderItem={(itemData) => (
          <AdminCategoriesCard
            category={itemData.item.category_Name}
            catImage={itemData.item.category_Image}
            catList={itemData.item.category_Local}
            catId={itemData.item.category_Id}
            shopId={shopId}
            dispatch={dispatch}
            navigate={LocalCategoryNavigate}
            editNavigate={EditGlobalCategory}
          />
        )}
      />
    </View>
  );
};

AddGCScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "DukaanDar",

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            const ShopId = NavData.navigation.getParam("ShopId");
            NavData.navigation.navigate("Add", {
              shopId: ShopId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default AddGCScreen;
