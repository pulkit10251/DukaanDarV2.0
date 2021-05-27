const initialState = {
    AllshopIds: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "ADD_SHOP_IDS":
          const shopIds = action.AllshopIds;

        return {
          AllshopIds: shopIds,
        };
    }
    return state;
  };
  