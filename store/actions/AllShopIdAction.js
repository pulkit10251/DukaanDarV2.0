

export const getAllShopId = () => {
    return async (dispatch, getState) => {
      const token = await getState().auth.token;
  
      const response = await fetch(
        `https://dukaandar-e4590.firebaseio.com/AllShopIds.json`
      );
  
      const resData = await response.json();


      const shopIds = []; 
      for(const key in resData){
          shopIds.push(resData[key]);
      }

  
      dispatch({
        type: "ADD_SHOP_IDS",
        AllshopIds: shopIds,
      });
    };
  };
  