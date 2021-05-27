const initialState = {
  profileData: {},
  shopIds:[],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      const profileData = action.profileData;
      const ShopIds = action.shopIds;
      return {
        ...state,
        profileData: profileData,
        shopIds: ShopIds,
      };

      case "SET_SHOP_IDS":
        const shopIds = action.shopIds
        return {
          ...state,
          shopIds: shopIds,
        };

      
    }
  
  return state;
};


