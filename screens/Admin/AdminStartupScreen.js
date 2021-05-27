import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as ShopActions from "../../store/actions/ShopAction";

const AdminStartupScreen = (props) => {
  const shopId = useSelector((state) => state.dukanId.shopId);
  const [cancelled, setCancelled] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const dispatchFcn = async () => {
      let isCancelled = false;
      try {
        if (!isCancelled) await dispatch(ShopActions.fetchShop());
      } catch (err) {
        if (!isCancelled) console.log(err);
      }
    };
    dispatchFcn();
    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  const shop = useSelector((state) => state.shops.ShopData[shopId]);

  if (shop === undefined) {
    props.navigation.navigate("NewAdmin");
  } else {
    props.navigation.navigate("OldAdmin");
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default AdminStartupScreen;
