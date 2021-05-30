const initialState = {
  shopId: "",
  shopName: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_SHOP_ID_DUKAANDAR":
      const shopId = action.shopId;
      const shopName = action.shopName;
      return {
        shopId: shopId,
        shopName: shopName,
      };
  }
  return state;
};
