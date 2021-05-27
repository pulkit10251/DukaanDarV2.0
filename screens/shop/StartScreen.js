import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import Card from "../../components/UI/Card";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as ShopIDAction from "../../store/actions/ShopIdAction";
import * as ShopStoreActions from "../../store/actions/ShopStoreAction";
import * as ShopActions from "../../store/actions/ShopAction";
import * as ProfileActions from "../../store/actions/ProfileAction";
import * as DukaanDarActions from "../../store/actions/DukaanDarIdAction";
import * as AllShopIDActions from "../../store/actions/AllShopIdAction";

import ModalView from "../../components/UI/ModalView";
import Colors from "../../constants/Colors";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { normalize } from "react-native-elements";
import AllShopIDReducer from "../../store/reducers/AllShopIDReducer";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      Alert.alert("Turn on notifications", "Go to settings", [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: "ok",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
      const { status: ExistingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      finalStatus = ExistingStatus;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

const StartScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       setNotification(notification);
  //     }
  //   );

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log(response);
  //     }
  //   );

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  useEffect(() => {
    const fetch = async () => {
      let isCancelled = false;
      setLoading(true);
      setError(null);
      try {
        if (!isCancelled) await dispatch(AllShopIDActions.getAllShopId());
      } catch (err) {
        if (!isCancelled) setError(err.message);
      }
      try {
        if (!isCancelled) await dispatch(ProfileActions.getProfileData());
      } catch (err) {
        if (!isCancelled) setError(err.message);
      }
      try {
        if (!isCancelled) await dispatch(ShopActions.fetchShop());
      } catch (err) {
        if (!isCancelled) setError(err.message);
      }
      try {
        if (!isCancelled) await dispatch(DukaanDarActions.getShopId());
      } catch (err) {
        if (!isCancelled) setError(err.message);
      }
      try {
        if (!isCancelled) await dispatch(ShopStoreActions.fetchCustomerData());
      } catch (err) {
        if (!isCancelled) setError(err.message);
      }
      setLoading(false);
    };
    fetch();

    return () => {
      isCancelled = true;
    };
  }, [dispatch, customerData, ShopData, AllShopsId, AddShopFunc]);

  const customerData = useSelector((state) => state.store.shops);
  const ShopData = useSelector((state) => state.shops.ShopData);
  const AllShopsId = useSelector((state) => state.AllIds.AllshopIds);
  const ShopDataArray = useSelector((state) => {
    const data = [];
    for (const key in state.shops.ShopData) {
      data.push(state.shops.ShopData[key]);
    }
    return data;
  });

  const [shopId, setShopId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setShopId("");
    setIsModalVisible((state) => !state);
  };

  useEffect(() => {
    props.navigation.setParams({
      toggleModal: toggleModal,
    });
  }, []);

  const QRScannerNavigate = () => {
    setIsModalVisible(false);
    props.navigation.navigate("QR", {
      setShopId: setShopId,
      setIsModalVisible: setIsModalVisible,
    });
  };

  const IntroNavigate = (id, shopName) => {
    props.navigation.navigate("Intro", {
      shopId: id,
      shopTitle: shopName,
    });
  };

  const createTwoButtonAlert = (shopId) =>
    Alert.alert(
      "Are you sure?",
      "All the items present in cart will also be deleted!!!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            var isCancelled = false;
            try{
              if(!isCancelled)
              await dispatch(ShopStoreActions.removeStore(shopId));
            }catch(err){
              if(!isCancelled)
              console.log(err);
            }
            try{
              if(!isCancelled)
              await dispatch(ShopActions.fetchShop());
            }catch(err){
              if(!isCancelled)
              console.log(err);
            }

            isCancelled = true;
          },
        },
      ],
      { cancelable: false }
    );

  const AddShopFunc = async (data) => {
    try{
    await dispatch(ShopStoreActions.addStore(data));
    }catch(err){
      console.log(err);
    }
    try{
    await dispatch(ShopActions.fetchShop());
    }catch(err){
      console.log(err);
    }
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
        data={ShopDataArray}
        keyExtractor={(item) => item.shop_Id}
        renderItem={(itemData) => (
          <Card
            shopName={itemData.item.shop_Name}
            deleteShop={() => createTwoButtonAlert(itemData.item.shop_Id)}
            GotoShopping={() => {
              dispatch(ShopIDAction.shopId(itemData.item.shop_Id));
              IntroNavigate(itemData.item.shop_Id, itemData.item.shop_Name);
            }}
          />
        )}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          "Click on the Add Button on the Extreme right{"\n"} to Add new Shops"
        </Text>
      </View>

      <ModalView
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        shopId={shopId}
        ShopData={ShopData}
        setShopId={setShopId}
        navigate={QRScannerNavigate}
        setModalVisibility={setIsModalVisible}
        AddShopFunc={AddShopFunc}
      />
    </View>
  );
};

StartScreen.navigationOptions = (NavData) => {
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
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={NavData.navigation.getParam("toggleModal")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
    fontSize: normalize(12),
  },
  textContainer: {
    alignItems: "center",
  },
});

export default StartScreen;
