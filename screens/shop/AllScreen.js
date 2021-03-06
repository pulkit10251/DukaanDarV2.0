import React  from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  FlatList,
  VirtualizedList,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import FrontCard from "../../components/UI/FrontCard";
import FrontImages from "../../components/UI/FrontImages";
import Header from "../../components/UI/Header";
import Colors from "../../constants/Colors";
import * as ShopStoreActions from "../../store/actions/ShopStoreAction";

const AllScreen = (props) => {
  const dispatch = useDispatch();

  const CategoryNavigate = (id) => {
    props.navigation.navigate("Category", {
      shopId: id,
    });
  };

  const searchScreenNavigate = (categoriesList, shopId) => {
    props.navigation.navigate("Search", {
      categories: categoriesList,
      shopId: shopId,
    });
  };

  const productDetailNavigate = (product, categoryList, shopId) => {
    props.navigation.navigate("productDetail", {
      product: product,
      categoryList: categoryList,
      shopId: shopId,
    });
  };
  const shopId = useSelector((state) => state.shopId.shopId);

  const shop = useSelector((state) =>
    state.shops.ShopData[shopId]
  );

  const Front = shop.shop_Front;
  const data = [];
  for (var i = 0; i < Front.length; i++) {
    const global = shop.shop_Categories.find(
      (item) => item.category_Id === Front[i].Global_Id
    );
    const localCategory = global.category_Local.find(
      (item) => item.Local_Id === Front[i].Local_Id
    );
    data.push(localCategory);
  }

  const getItemCount = (data) => {
    return data.length;
  };
  const getItem = (data, index) => {
    return data[index];
  };

  return (
    <View style={styles.container}>
      <Header
        CategoryNavigate={CategoryNavigate}
        id={shopId}
        shopCategories={shop.shop_Categories}
        SearchNavigate={searchScreenNavigate}
      />
      <VirtualizedList
        ListHeaderComponent={
          <View>
            <FrontImages shop_Offers={shop.shop_Offers} />
          </View>
        }
        initialNumToRender={4}
        data={data}
        keyExtractor={(item) => String(item.Local_Id)}
        renderItem={(itemData) => (
          <FrontCard
            data={itemData.item.category_Products}
            name={itemData.item.category_Name}
            shopId={shopId}
            navigation={productDetailNavigate}
          />
        )}
        getItem={getItem}
        getItemCount={getItemCount}
      />
    </View>
  );
};

AllScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "DukaanDar",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            NavData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            NavData.navigation.navigate("cart", {
              shopId: NavData.navigation.getParam("shopId"),
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 10 },
});

export default AllScreen;
