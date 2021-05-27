import StoreModel from "../../models/StoreModel";

export const ADD_STORE = "ADD_STORE";
export const REMOVE_STORE = "REMOVE_STORE";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const PLACE_ORDER = "PLACE_ORDER";
export const FETCH_CUSTOMER_DATA = "FETCH_CUSTOMER_DATA";

export const SET_SHOP_IDS = "SET_SHOP_IDS";
export const REMOVE_SHOP_IDS = "REMOVE_SHOP_IDS";

export const addStore = (shopId) => {
  return async (dispatch, getState) => {

    const shopIds = getState().profile.shopIds;
    var newShopIds;
    if (shopIds !== undefined) {
      newShopIds = [...shopIds, shopId];
    } else {
      newShopIds = [shopId];
    }

    dispatch({
      type: SET_SHOP_IDS,
      shopIds: newShopIds,
    });



    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const updatedShopIds = getState().profile.shopIds;
    
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Users/${userId}/ShopIds.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedShopIds),
      }
    );


    const resData = await response.json;

    dispatch({
      type: ADD_STORE,
      shopId: shopId,
    });

    const customerData = getState().store.shops;

    const response1 = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Customers/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );

    const resData1 = await response1.json();
  };
};

export const removeStore = (shopId) => {
  return async (dispatch, getState) => {
    dispatch({ type: REMOVE_STORE, shopId: shopId });

    const shopIds = getState().profile.shopIds;
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const UpdatedShopIds = shopIds.filter((item) => item != shopId);


    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Users/${userId}/ShopIds.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdatedShopIds),
      }
    );

    const resData = await response.json;

    const customerData = getState().store.shops;

    const response1 = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Customers/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );

    const resData1 = await response1.json();

    dispatch({ type: SET_SHOP_IDS, shopIds: UpdatedShopIds });
  };
};

export const addToCart = (product, quantity, categoryList, shopId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      product: product,
      quantity: quantity,
      categoryList: categoryList,
      shopId: shopId,
    });

    const customerData = getState().store.shops;
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response1 = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Customers/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );

    const resData1 = await response1.json();
  };
};

export const removeFromCart = (productId, shopId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      pid: productId,
      shopId: shopId,
    });

    const customerData = getState().store.shops;
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    const response1 = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Customers/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );

    const resData1 = await response1.json();
  };
};

export const placeOrder = (
  shopId,
  cartItems,
  totalAmount,
  totalMrp,
  paymentStatus,
  paymentMethod
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const uid = getState().auth.userId;
    const DummyId = new Date().getTime().toString();
    const date = new Date();

    dispatch({
      type: PLACE_ORDER,
      shopId: shopId,
      DummyId: DummyId,
      Date: date,
      orderData: {
        cartItems: cartItems,
        totalAmount: totalAmount,
        totalMrp: totalMrp,
      },
      paymentDetails: {
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
      },
      OrderStatus: "PENDING",
    });

    const CustomerData = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Users/${uid}.json?auth=${token}`
    );

    const customerResponse = await CustomerData.json();

    const expoId = await fetch(
      `https://dukaandar-e4590.firebaseio.com/ExpoTokens/${customerResponse.uid}.json?auth=${token}`
    );

    const expoData = await expoId.json();

    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/shopOrders/${shopId}/active/${DummyId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Date: date,
          Id: DummyId,
          orderData: {
            cartItems: cartItems,
            totalAmount: totalAmount,
            totalMrp: totalMrp,
          },
          paymentDetails: {
            paymentMethod: paymentMethod,
            paymentStatus: paymentStatus,
          },
          CustomerName: customerResponse.name,
          CustomerMobileNumber: customerResponse.contact,
          CustomerEmail: customerResponse.email,
          userId: customerResponse.uid,
          OrderStatus: "PENDING",
          expoToken: expoData.expoToken,
        }),
      }
    );
    const customerData = getState().store.shops;

    const response1 = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Customers/${uid}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );

    const resData1 = await response1.json();
  };
};

export const fetchCustomerData = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Customers/${userId}.json?auth=${token}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const customerData = {};

    for (const key in resData) {
      var orders;
      if (resData[key].YourOrders === undefined) {
        orders = [];
      } else {
        orders = resData[key].YourOrders;
      }
      var cartItems;
      if (resData[key].cartItems === undefined) {
        cartItems = {};
      } else {
        cartItems = resData[key].cartItems;
      }

      customerData[key] = new StoreModel(
        key,
        cartItems,
        orders,
        resData[key].TotalAmount,
        resData[key].TotalMrp
      );
    }
    dispatch({
      type: FETCH_CUSTOMER_DATA,
      customerData: customerData,
    });
  };
};

export const changeOrderStatus = (shopId, orderId, status, userId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/shopOrders/${shopId}/active/${orderId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OrderStatus: status,
        }),
      }
    );

    const Response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Customers/${userId}/${shopId}/YourOrders/${orderId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus: status,
        }),
      }
    );
  };
};

export const getOrderStatus = (shopId, orderId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/shopOrders/${shopId}/active/${orderId}/OrderStatus.json?auth=${token}`
    );
    const resData = await response.json();

    dispatch({
      type: "GET_STATUS",
      status: resData === null ? "PACKED" : resData,
    });
  };
};
