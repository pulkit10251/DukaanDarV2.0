import React, { useState, useEffect } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItemAdmin from "../../components/UI/OrderItemAdmin";
import Colors from "../../constants/Colors";
import * as OrderActions from "../../store/actions/OrderAction";

const DeliveredOrder = (props) => {
  const dispatch = useDispatch();
  const [cancelled, setCancelled] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const dispatchFcn = async () => {
      setLoading(true);
      setCancelled(true);
      try {
        await dispatch(OrderActions.fetchOrders(shopId));
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
      setCancelled(false);
    };
    dispatchFcn();

    return () => {
      setCancelled(false);
    }
  }, [dispatch]);

  const delivered = useSelector((state) => state.orders.delivered);
  const shopId = props.navigation.getParam("shopId");

  const OrderDetailNavigate = (Order, shopId) => {
    props.navigation.navigate("OrderDetail", {
      Order: Order,
      ShopId: shopId,
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={delivered.reverse()}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <View>
            <OrderItemAdmin
              date={itemData.item.date}
              id={itemData.item.id}
              paymentMethod={itemData.item.paymentMethod}
              paymentStatus={itemData.item.paymentStatus}
              orderStatus={itemData.item.orderStatus}
              name={itemData.item.customerName}
              navigate={() => {
                OrderDetailNavigate(itemData.item, shopId);
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

DeliveredOrder.navigationOptions = (NavData) => {
  return {
    headerTitle: "Delivered Order",
  };
};

export default DeliveredOrder;
